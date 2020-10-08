from django.urls import path
from django.urls.conf import include
from .views import ProductList, ProductDetail, UserAddress, UserAddressCreation, OrderListUpdate, DeleteOrderItem, TrackOrder, Checkout

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),

    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<pk>/', ProductDetail.as_view(), name='product-detail'),

    path('order/', OrderListUpdate.as_view(), name='order'),
    path('order/<pk>', TrackOrder.as_view(), name='order-tracking'),

    path('orderitem/<pk>', DeleteOrderItem.as_view(), name='delete-order-item'),

    # path('coupon/', ApplyCoupon.as_view(), name='apply-coupon'),
    # Apply coupon in patch request to order
    path('payment/', Checkout.as_view(), name='apply-coupon'),

    # apply coupon
    # Payments <List and  pay>

    path('addresses/', UserAddressCreation.as_view(), name='address-create'),
    path('addresses/<pk>/', UserAddress.as_view(), name='address-detail'),
]
