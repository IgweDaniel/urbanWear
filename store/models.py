from typing import Sized
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return f"{self.username} <{self.email}> "


class Category(models.Model):
    name = models.CharField(max_length=30)
    image = models.ImageField()

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.name}"


class ProductSize(models.Model):
    SIZE_CHOICES = (
        ('XXS', 'ExtraExtraSmall'),
        ('XS', 'ExtraSmall'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'ExtraLarge'),
        ('XXL', 'ExtraExtraLarge'),
    )
    label = models.CharField(choices=SIZE_CHOICES, max_length=20)

    def __str__(self):
        return f"{self.label}"


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField(default=10)
    discount = models.FloatField(default=0)
    slug = models.SlugField()
    description = models.TextField()
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='products')

    sizes = models.ManyToManyField(ProductSize)

    def __str__(self):
        return f"{self.name} in category {self.category} costing ${self.price}"

    def final_price(self):
        discount_price = self.price - self.price * self.discount
        return discount_price


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField()


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField(default=0)

    def __str__(self):
        return f"{self.code} subtracts {self.amount}"


class Address(models.Model):
    ADDRESS_TYPES = (
        ('B', 'Billing'),
        ('S', 'Shipping'),
    )

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='addresses', null=False, blank=False)
    street = models.CharField(max_length=100)
    apartment = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    address_type = models.CharField(max_length=1, choices=ADDRESS_TYPES)
    default = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Addresses"


class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    size = models.ForeignKey(
        ProductSize, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"OrderItem for {self.user.email} with product {self.product.name} and qty {self.quantity}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon = models.ForeignKey(
        Coupon, on_delete=models.SET_NULL, blank=True, null=True)

    items = models.ManyToManyField(OrderItem, related_name='parent')
    shipping_address = models.ForeignKey(
        'Address', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    billing_address = models.ForeignKey(
        'Address', related_name='billing_address', on_delete=models.SET_NULL, blank=True, null=True)

    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField(null=True, blank=True)

    ordered = models.BooleanField(default=False)
    delivered = models.BooleanField(default=False)

    def __str__(self):
        return f"Order for {self.user.email}  and total {self.calc_total_price()}"

    def calc_total_price(self):
        total = 0
        for item in self.items.all():
            total + item.product.final_price()
        if self.coupon:
            total -= self.coupon.amount
