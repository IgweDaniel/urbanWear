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
        return f"{self.email} "


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
        return f"{self.name} ({self.category})-${self.final_price()}"

    def final_price(self):
        discount_price = self.price - self.price * self.discount
        return discount_price


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField("img")

    def __str__(self):
        return f"Image ( {self.image.url} ) attached to {self.product.name} {self.product.category.name}"


class Coupon(models.Model):
    code = models.CharField(max_length=15, unique=True)
    amount = models.FloatField(default=0)
    used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.code} subtracts ${self.amount}"


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

    def __str__(self):
        return f"Address {self.street} for user {self.user.email} "


class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} paid {self.amount}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon = models.ForeignKey(
        Coupon, on_delete=models.SET_NULL, blank=True, null=True)

    shipping_address = models.ForeignKey(
        'Address', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    billing_address = models.ForeignKey(
        'Address', related_name='billing_address', on_delete=models.SET_NULL, blank=True, null=True)

    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField(null=True, blank=True)
    payment = models.ForeignKey(
        Payment, on_delete=models.SET_NULL, blank=True, null=True)
    ordered = models.BooleanField(default=False)
    delivered = models.BooleanField(default=False)

    def __str__(self):
        order__status = "PENDING delivery" if self.ordered else "ACTIVE"
        return f"{order__status} order for {self.user.email}  worth ${self.calc_total_price()}"

    def calc_total_price(self):
        total = 0
        for item in self.items.all():
            total += item.sub_total()
        if self.coupon:
            total -= self.coupon.amount
        return 0 if total <= 0 else total


class OrderItem(models.Model):
    size = models.ForeignKey(
        ProductSize, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='items')

    def sub_total(self):
        return self.product.final_price() * self.quantity

    def __str__(self):
        return f"{self.quantity} [{self.size.get_label_display()}]  {self.product.name} ({self.product.category.name})-${self.sub_total()}"
