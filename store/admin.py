from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Product, Category, ProductImage, Coupon, Order, Address, ProductSize, OrderItem
# Register your models here.


class OrderItemInline(admin.TabularInline):
    # fields = ("size", "product")
    model = OrderItem


class ProductImageInline(admin.TabularInline):
    model = ProductImage


class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', "ordered", 'delivered', 'order_detail')

    inlines = [
        OrderItemInline
    ]

    def order_detail(self, obj):
        return f" Order for {obj.user.email}  worth ${obj.calc_total_price()}"


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', "price", 'category', 'actual_price')

    def category(self, obj):
        return obj.category.name

    def actual_price(self, obj):
        return f"${obj.final_price()}"

    inlines = [
        ProductImageInline
    ]


admin.site.register(User, UserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Coupon)
admin.site.register(Address)
admin.site.register(Order, OrderAdmin)
admin.site.register(ProductSize)
admin.site.register(OrderItem)
