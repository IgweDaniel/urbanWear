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
    list_display = ("ordered", 'delivered', 'order_detail')

    inlines = [
        OrderItemInline
    ]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(ordered=True)

    def order_detail(self, obj):
        return f" PAID Order for {obj.billing_address.name } {obj.billing_address.lastname}  worth ${obj.calc_total_price()}" if obj.ordered else f" Order for  {obj.user.email} worth ${obj.calc_total_price()}"


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
