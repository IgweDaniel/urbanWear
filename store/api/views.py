
from rest_framework import generics
from store.models import Coupon, Product, ProductSize, Order, Address, OrderItem
from .serializers import ProductSerializer, AddressSerializer, OrderSerializer, OrderItemSerializer, OrderUpdateSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND


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
    permission_classes = [IsAuthenticated, IsOwnerPermission]

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

    def put(self, request, *args, **kwargs):
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

        if status == "active":
            cart = Order.objects.get_or_create(
                user=request.user, ordered=False)[0]
            return Response(OrderSerializer(cart).data, status=HTTP_200_OK)

        orders = Order.objects.filter(
            user=request.user, ordered=True)
        return Response(OrderSerializer(orders, many=True).data, status=HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        coupon_code = request.data.get('coupon', None)
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


class Checkout(generics.ListCreateAPIView):
    pass
#  return Response({'message':"Just TESTING"}, status=HTTP_200_OK)
