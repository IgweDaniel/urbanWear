from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Product, Category, ProductImage, Coupon, Order, Address, ProductSize, OrderItem
# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Coupon)
admin.site.register(Address)
admin.site.register(Order)
admin.site.register(ProductSize)
admin.site.register(OrderItem)
