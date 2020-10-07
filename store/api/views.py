from rest_framework import generics
from store.models import OrderItem, Product, ProductSize, Order, Address, OrderItem
from .serializers import ProductSerializer, AddressSerializer, OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from django.db.models import Q


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


class AddToCart(APIView):
    permission_classes = [IsAuthenticated, IsOwnerPermission]

    def post(self, request, *args, **kwargs):
        size_label = request.data.get('size', None)
        product_id = request.data.get('productId', None)
        quantity = request.data.get('quantity', None)
        if product_id is None:
            return Response({"message": "Invalid request(productId Required)"}, status=HTTP_400_BAD_REQUEST)
        if size_label is None:
            return Response({"message": "Invalid request(size required)"}, status=HTTP_400_BAD_REQUEST)
        try:
            product = Product.objects.get(pk=product_id)

            # Check if product has requested label
            label = product.sizes.all().filter(label=size_label)
            if not label.exists():
                return Response({"message": "Invalid request(size nonexistent on product)"}, status=HTTP_400_BAD_REQUEST)
            size = label[0]

            # Find Active Order or Create One
            active_order = Order.objects.filter(
                user=request.user, ordered=False)
            if not active_order.exists():
                active_order = Order.objects.create(user=request.user)
            else:
                active_order = active_order[0]

            # Check for OrderItem
            order_item = active_order.items.all().filter(
                product=product).filter(size__label=size)

            if not order_item.exists():
                order_item = OrderItem.objects.create(
                    user=request.user, size=size, product=product, quantity=0)
                active_order.items.add(order_item)
                active_order.save()
            else:
                order_item = order_item[0]

        # Update Quantity
            if quantity is not None:
                order_item.quantity += quantity
            else:
                order_item.quantity += 1
                order_item.save()
            print(product, active_order)
            # return Response({"message": "Just Tessting"}, status=HTTP_200_OK)
            return Response(OrderItemSerializer(order_item).data, status=HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"message": "Resource not Found"}, status=HTTP_404_NOT_FOUND)
