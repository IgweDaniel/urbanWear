
import os
from rest_framework import generics
from store.models import Coupon, Payment, Product, ProductSize, Order, Address, OrderItem
from .serializers import PaymentSerializer, ProductSerializer, AddressSerializer, OrderSerializer, OrderItemSerializer, OrderUpdateSerializer, CartSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
import stripe

stripe.api_key = os.getenv("STRIPE_KEY")


class IsOwnerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        # if request.method in SAFE_METHODS:
        #     return True
        return obj.user == request.user


class ProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
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


class UserAddressCreation(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Address.objects.all().filter(user=self.request.user)
        return queryset


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
            return Response(OrderItemSerializer(order_item).data, status=HTTP_200_OK)
        else:
            cart = request.session['cart'] if request.session.get(
                'cart', None) else {"items": [], "total": 0, "quantity": 0}

            for item in cart['items']:
                if item['product']['name'] == product.name:
                    item['quantity'] += quantity
                    cart['total'] += quantity * item['product']['price']
                    break
            else:
                cart['items'].append(
                    {"product": ProductSerializer(
                        product).data, "size": size.label, "quantity": quantity})
                cart['total'] += quantity * product.price

            cart['quantity'] += quantity
            request.session['cart'] = cart
            return Response(cart, status=HTTP_200_OK)
            # return Response(CartSerializer(request.session['cart']).data, status=HTTP_200_OK)

    def put(self, request, *args, **kwargs):

        print("Hello")
        return Response({"message": "yet to refactor"}, status=HTTP_400_BAD_REQUEST)
        items = request.data.get('items', None)
        serializer = OrderUpdateSerializer(data=items, many=True)

        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)

        items = serializer.validated_data
        active_order = Order.objects.get_or_create(
            user=request.user, ordered=False)[0]

        for item in items:
            size = item.get('size')
            product = item.get('product')
            quantity = item.get('quantity')

            size = product.sizes.all().filter(label=size.label)

            if not size.exists():
                continue
            size = size[0]

            order_item = active_order.items.all().filter(
                product=product).filter(size=size)

            if not order_item.exists():
                continue

            order_item = order_item[0]

            order_item.quantity = quantity
            order_item.size = size
            order_item.save()

        return Response(OrderSerializer(active_order).data, status=HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        status = request.query_params.get("status", None)
        if request.user.is_authenticated:
            if status == "active":
                cart = Order.objects.get_or_create(
                    user=request.user, ordered=False)[0]
                return Response(OrderSerializer(cart).data, status=HTTP_200_OK)

            orders = Order.objects.filter(
                user=request.user, ordered=True)
            return Response(OrderSerializer(orders, many=True).data, status=HTTP_200_OK)
        else:
            cart = request.session['cart'] if request.session.get(
                'cart', None) else {"items": [], "total": 0, "quantity": 0}
            return Response(cart, status=HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        coupon_code = request.data.get('coupon', None)
        if request.user.is_authenticated:
            return Response({"message": "Coupon Applicable for registered users only"}, status=HTTP_400_BAD_REQUEST)
        if not coupon_code:
            return Response({"message": "Invalid input"}, status=HTTP_400_BAD_REQUEST)
        coupon = Coupon.objects.all().filter(code__exact=coupon_code)
        if not coupon.exists():
            return Response({'message': "invalid coupon"}, status=HTTP_404_NOT_FOUND)
        coupon = coupon[0]
        if coupon.used:
            return Response({'message': "expired coupon"}, status=HTTP_404_NOT_FOUND)
        activeorder = Order.objects.get_or_create(
            user=request.user, ordered=False)[0]
        activeorder.coupon = coupon
        coupon.used = True
        coupon.save()
        activeorder.save()
        return Response({'message': "Coupon Applied"}, status=HTTP_200_OK)


class TrackOrder(generics.RetrieveAPIView):
    permission_classes = []
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all().filter(ordered=True)
        return queryset


class DeleteOrderItem(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        cart = Order.objects.get_or_create(
            user=self.request.user, ordered=False)[0]
        queryset = cart.items.all()
        return queryset


def get_address(value, user):
    if value is None:
        return Response({"message": "Address Required"}, status=HTTP_404_NOT_FOUND)
    if type(value) is int:
        address = Address.objects.all().filter(user=user, pk=value)
        if not address.exists():
            return Response({"message": "No adress with such <pk>"}, status=HTTP_404_NOT_FOUND)
        address = address[0]
        return address
    if type(value) is dict:
        serializer = AddressSerializer(data=value)
        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)
        address = Address.objects.create(
            **serializer.validated_data, user=user)
        return address


class ListCreatePayment(generics.ListCreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        source = request.data.get("token", None)
        if not source:
            return Response({"message": "Card Token Required"}, status=HTTP_400_BAD_REQUEST)
        active_order = Order.objects.get_or_create(
            user=request.user, ordered=False)[0]
        items = active_order.items.all()
        if not items.exists():
            return Response({"message": "No items in Cart Cart"}, status=HTTP_400_BAD_REQUEST)

        amount_to_pay = active_order.calc_total_price()
        if amount_to_pay <= 0:
            return Response({"message": "Cart Total must be greater than $5"}, status=HTTP_400_BAD_REQUEST)

        billing_address = request.data.get("address1", None)
        shipping_address = request.data.get("address2", None)

        """
        Force address Type to shipping or billing as deemed fit
        """
        address = get_address(billing_address, request.user)
        try:
            if request.user.stripe_customer_id != "" and request.user.stripe_customer_id is not None:
                customer = stripe.Customer.retrieve(
                    request.user.stripe_customer_id)
            else:
                customer = stripe.Customer.create(
                    email=request.user.email,
                )
                request.user.stripe_customer_id = customer.id
                request.user.save()
            customer.sources.create(source=source)

            charge = stripe.Charge.create(
                amount=int(amount_to_pay) * 100,
                currency='usd',
                customer=request.user.stripe_customer_id,
            )
            payment = Payment.objects.create(
                user=request.user,
                amount=amount_to_pay,
                stripe_charge_id=charge.id
            )
            active_order.payment = payment
            active_order.billing_address = address
            active_order.ordered = True
            active_order.save()

        except stripe.error.CardError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except stripe.error.RateLimitError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except stripe.error.InvalidRequestError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except stripe.error.AuthenticationError as e:

            return Response({'message': e.error.message}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        except stripe.error.APIConnectionError as e:
            return Response({'message': e.error.message}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        except stripe.error.StripeError as e:
            return Response({'message': e.error.message}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Something else happened, completely unrelated to Stripe
            print(e)
            return Response({'message': "Server Error"}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message': OrderSerializer(active_order).data}, status=HTTP_200_OK)

    def get_queryset(self):
        queryset = Payment.objects.all().filter(user=self.request.user)
        return queryset
#  return Response({'message':"Just TESTING"}, status=HTTP_200_OK)
