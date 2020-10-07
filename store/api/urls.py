from django.urls import path
from django.urls.conf import include
from .views import ProductList, ProductDetail, UserAddress, UserAddressCreation, AddToCart

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),

    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<pk>/', ProductDetail.as_view(), name='product-detail'),

    path('order/', AddToCart.as_view(), name='product-detail'),

    path('addresses/', UserAddressCreation.as_view(), name='address-create'),
    path('addresses/<pk>/', UserAddress.as_view(), name='address-detail'),
]
