
import json
import os
from rest_framework import generics
from django.db.models import Q
from store.models import Category, Coupon, Payment, Product, ProductSize, Order, Address, OrderItem, User
from .serializers import CategorySerializer, PaymentSerializer, ProcessPaymentSerializer, ProductSerializer, AddressSerializer, OrderSerializer, OrderItemSerializer, OrderUpdateSerializer, CartSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
import stripe
from django.core.mail import send_mail

from .pagination import ProductListPagination

stripe.api_key = os.getenv("STRIPE_KEY")


GUEST_INITIAL_CART = {"items": [], "total": 0, "quantity": 0, 'coupon': {
    'amount': 0,
    'code': ''
}
}


def dump_guest_cart(cart):
    cart = dict(cart)
    cart['total'] -= cart['coupon']['amount']

    return cart


def findItem(collection, cb):
    for item in collection:
        if cb(item) == True:
            return item
    else:
        return None


class IsOwnerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        # if request.method in SAFE_METHODS:
        #     return True
        return obj.user == request.user


class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductListPagination

    def get_queryset(self):
        queryset = Product.objects.order_by('name')
        category = self.request.query_params.get('category', None)
        size = self.request.query_params.get('size', None)

        if category is not None:
            queryset = queryset.filter(category__name=category)
        if size is not None:
            queryset = queryset.filter(
                sizes__in=ProductSize.objects.filter(label=size))

        return queryset


class ProductDetail(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field = "slug"


class UserAddressCreation(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]

    def create(self, request, *args, **kwargs):
        serializer = AddressSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)
        data = dict(serializer.validated_data)
        address_type = data.get('address_type')
        Address.objects.update_or_create(
            default=True, address_type=address_type,
            user=self.request.user, defaults=data)
        return Response(UserSerializer(self.request.user).data, status=HTTP_200_OK)


class UserAddress(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerPermission]


class OrderListUpdate(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = OrderUpdateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)
        data = serializer.validated_data
        size = data.get('size')
        product = data.get('product')
        quantity = data.get('quantity', None)
        # Check if product has requested label
        size = product.sizes.all().filter(label=size.label)
        if not size.exists():
            return Response({"message": "Invalid request(size nonexistent on product)"}, status=HTTP_400_BAD_REQUEST)
        size = size[0]
        if request.user.is_authenticated:
            # Find Active Order or Create One
            active_order = Order.objects.get_or_create(
                user=request.user, ordered=False)[0]

            # Check for OrderItem
            order_item = active_order.items.all().filter(
                product=product).filter(size__label=size.label)

            if not order_item.exists():
                order_item = active_order.items.create(
                    size=size, product=product, quantity=0)
            else:
                order_item = order_item[0]

            # Update Quantity

            if quantity is not None:
                order_item.quantity += quantity
            else:
                order_item.quantity += 1

            order_item.save()
            return Response(CartSerializer(active_order).data, status=HTTP_200_OK)
        else:
            cart = request.session['cart'] if request.session.get(
                'cart', None) else GUEST_INITIAL_CART

            item_id = len(cart['items']) + 1

            item = findItem(cart['items'], lambda item: item['product']
                            ['name'] == product.name and item['size'] == size.label)

            if item:
                item['quantity'] += quantity
                cart['total'] += quantity * item['product']['price']
            else:
                cart['items'].append(
                    {"product": ProductSerializer(
                        product).data, "size": size.label, "quantity": quantity, "id": item_id})
                cart['total'] += quantity * product.price

            cart['quantity'] += quantity
            request.session['cart'] = cart
            return Response(dump_guest_cart(cart), status=HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        status = request.query_params.get("status", None)
        if request.user.is_authenticated:
            if status == "active":
                cart = Order.objects.get_or_create(
                    user=request.user, ordered=False)[0]
                return Response(CartSerializer(cart).data, status=HTTP_200_OK)

            orders = Order.objects.filter(
                user=request.user, ordered=True)
            return Response(OrderSerializer(orders, many=True).data, status=HTTP_200_OK)
        else:
            cart = request.session['cart'] if request.session.get(
                'cart', None) else GUEST_INITIAL_CART

            return Response(dump_guest_cart(cart), status=HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        coupon_code = request.data.get('code', None)
        if not coupon_code:
            return Response({"message": "Invalid input"}, status=HTTP_400_BAD_REQUEST)
        coupon = Coupon.objects.all().filter(code__exact=coupon_code)
        if not coupon.exists():
            return Response({'message': "invalid coupon"}, status=HTTP_400_BAD_REQUEST)
        coupon = coupon[0]
        if coupon.used:
            return Response({'message': "expired coupon"}, status=HTTP_400_BAD_REQUEST)

        if request.user.is_authenticated:
            activeorder = Order.objects.get_or_create(
                user=request.user, ordered=False)[0]
            activeorder.coupon = coupon
            coupon.used = True
            coupon.save()
            activeorder.save()
            return Response(CartSerializer(activeorder).data, status=HTTP_200_OK)

        else:
            cart = request.session['cart'] if request.session.get(
                'cart', None) else GUEST_INITIAL_CART
            cart['coupon']['code'] = coupon.code
            cart['coupon']['amount'] = coupon.amount
            request.session['cart'] = cart
            return Response(dump_guest_cart(cart), status=HTTP_200_OK)


class TrackOrder(generics.RetrieveAPIView):
    permission_classes = []
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all().filter(ordered=True)
        return queryset


class DeleteUpdateOrderItem(APIView):
    permission_classes = []

    def delete(self, request, *args, **kwargs):
        try:
            pk = int(kwargs['pk'])
        except ValueError:
            return Response({"message": "Invalid CartItemId"}, status=HTTP_400_BAD_REQUEST)
        if request.user.is_authenticated:
            # Find Active Order or Create One
            active_order = Order.objects.get_or_create(
                user=request.user, ordered=False)[0]
            order_item = active_order.items.all().filter(
                pk=pk)
            if not order_item.exists():
                return Response({"message": "Invalid CartItemId"}, status=HTTP_400_BAD_REQUEST)
            order_item = order_item[0]
            order_item.delete()
            return Response(CartSerializer(active_order).data, status=HTTP_200_OK)

        else:
            cart = request.session['cart'] if request.session.get(
                'cart', None) else GUEST_INITIAL_CART
            item = findItem(cart['items'], lambda item: item['id'] == pk)
            if not item:
                return Response({"message": "Invalid CartItemId"}, status=HTTP_400_BAD_REQUEST)

            cart['total'] -= item['quantity'] * item['product']['price']
            cart['quantity'] -= item['quantity']
            cart['items'].remove(item)
            request.session['cart'] = cart
            return Response(dump_guest_cart(cart), status=HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        try:
            pk = int(kwargs['pk'])
        except ValueError:
            return Response({"message": "Invalid CartItemId"}, status=HTTP_400_BAD_REQUEST)
        try:
            quantity = int(request.data.get('quantity', None))
        except ValueError:
            return Response({"message": "Invalid Quantity value"}, status=HTTP_400_BAD_REQUEST)

        size = request.data.get('size')

        if request.user.is_authenticated:
            # Find Active Order or Create One
            active_order = Order.objects.get_or_create(
                user=request.user, ordered=False)[0]
            order_item = active_order.items.all().filter(
                pk=pk)

            if not order_item.exists():
                return Response({"message": "Invalid CartItemId"}, status=HTTP_400_BAD_REQUEST)
            order_item = order_item[0]
            size = ProductSize.objects.filter(label=size)[0]

            order_item.quantity = quantity
            order_item.size = size
            order_item.save()
            return Response(CartSerializer(active_order).data, status=HTTP_200_OK)
        else:
            cart = request.session['cart'] if request.session.get(
                'cart', None) else GUEST_INITIAL_CART
            item = findItem(cart['items'], lambda item: item['id'] == pk)
            if not item:
                return Response({"message": "Invalid CartItemId"}, status=HTTP_400_BAD_REQUEST)

            has_size = findItem(
                item['product']['sizes'], lambda item: item == size)
            if not has_size:
                return Response({"message": "Invalid product size"}, status=HTTP_400_BAD_REQUEST)

            old_quantity = item['quantity']

            cart['total'] -= old_quantity * item['product']['price']
            cart['quantity'] -= old_quantity
            item['quantity'] = quantity
            item['size'] = size
            cart['total'] += quantity * item['product']['price']
            cart['quantity'] += quantity
            request.session['cart'] = cart

            return Response(dump_guest_cart(cart), status=HTTP_200_OK)


class ListCreatePayment(generics.ListCreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = ProcessPaymentSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)
        data = serializer.validated_data
        source = data.get("token")
        email = data.get("email", None)
        password = data.get("password", None)
        billing_address = data.get("billing")
        shipping_address = data.get("shipping")

        active_order = Order.objects.get_or_create(
            user=request.user, ordered=False)[0] if request.user.is_authenticated else dump_guest_cart(request.session['cart'])

        items = None
        if request.user.is_authenticated:
            items = active_order.items.all()
            if not items.exists():
                return Response({"message": "No items in Cart Cart"}, status=HTTP_400_BAD_REQUEST)
        else:
            items = active_order.get("items")
            if len(items) < 1:
                return Response({"message": "No items in Cart Cart"}, status=HTTP_400_BAD_REQUEST)

        amount_to_pay = active_order.calc_total_price(
        ) if request.user.is_authenticated else active_order.get('total')

        if amount_to_pay <= 0:
            return Response({"message": "Cart Total must be greater than $5"}, status=HTTP_400_BAD_REQUEST)

        try:
            charge = stripe.Charge.create(
                amount=int(amount_to_pay) * 100,
                currency='usd',
                source=source,
            )

            user = None
            if request.user.is_authenticated:
                user = request.user
            elif email and password:
                user = User.objects.create_user(
                    username=email, email=email, password=password)

            # create order and copy guest cart for unauthenticated user
            if not request.user.is_authenticated:
                active_order = Order.objects.create(user=user)
                for item in items:
                    OrderItem.objects.create(
                        size=ProductSize.objects.filter(label=item['size'])[0],
                        product=Product.objects.get(pk=item['product']['id']),
                        quantity=item['quantity'],
                        order=active_order
                    )
                request.session['cart'] = GUEST_INITIAL_CART

            payment = Payment.objects.create(
                user=user,
                amount=amount_to_pay,
                stripe_charge_id=charge.id
            )

            active_order.payment = payment

            active_order.billing_address = Address.objects.create(
                **billing_address, user=user)

            active_order.shipping_address = Address.objects.create(
                **shipping_address, user=user)

            active_order.ordered = True
            active_order.save()

            # send_mail(
            #     'Payment Reciept',
            #     f'Payment succesful. total purchase {amount_to_pay} and order id {active_order.id}',
            #     'UrbanWear',
            #     [email],
            #     fail_silently=False,
            # )
            return Response(OrderSerializer(active_order).data, status=HTTP_200_OK)

        except stripe.error.CardError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except stripe.error.RateLimitError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except stripe.error.InvalidRequestError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except stripe.error.AuthenticationError as e:
            return Response({'message': e.error.message}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        except stripe.error.APIConnectionError as e:
            return Response({'message': "Server Error (couldn't connect to stripe)"}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        except stripe.error.StripeError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Something else happened, completely unrelated to Stripe
            print(e)
            return Response({'message': "Server Error"}, status=HTTP_500_INTERNAL_SERVER_ERROR)

    def get_queryset(self):
        queryset = Payment.objects.all().filter(user=self.request.user)
        return queryset
#  return Response({'message':"Just TESTING"}, status=HTTP_200_OK)
