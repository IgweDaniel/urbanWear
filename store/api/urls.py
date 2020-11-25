from django.urls import path
from django.urls.conf import include
from .views import ProductList, ProductDetail, UserAddress, UserAddressCreation, OrderListUpdate, TrackOrder, ListCreatePayment, DeleteUpdateOrderItem, CategoryList


urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),

    path('categories/', CategoryList.as_view(), name='categories-list'),
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<slug>/', ProductDetail.as_view(), name='product-detail'),

    path('order/', OrderListUpdate.as_view(), name='order'),
    path('order/<pk>', TrackOrder.as_view(), name='order-tracking'),
    path('orderitem/<pk>', DeleteUpdateOrderItem.as_view(),
         name='delete-order-item'),

    # Payments <List and  pay>
    path('payment/', ListCreatePayment.as_view(), name='checkout'),


    path('addresses/', UserAddressCreation.as_view(), name='address-create'),
    path('addresses/<pk>/', UserAddress.as_view(), name='address-detail'),
]
