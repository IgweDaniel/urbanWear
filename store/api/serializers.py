from rest_framework import serializers
from store.models import Category, Payment, Product, ProductSize, Address, Order, OrderItem, User


class UserSerializer(serializers.ModelSerializer):
    address = serializers.SerializerMethodField()
    orders = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'address', 'username', 'orders']

    def get_address(self, obj):
        billing, shipping = None, None
        for address in obj.addresses.all().filter(default=True):
            if address.address_type == "S":
                shipping = AddressSerializer(address).data
            else:
                billing = AddressSerializer(address).data

        return {"billing": billing, "shipping": shipping}

    def get_orders(self, obj):
        orders = obj.orders.all().filter(ordered=True)

        return OrderSerializer(orders, many=True).data


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'id']


class ProductSerializer(serializers.ModelSerializer):
    discount_price = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    sizes = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['name', 'price', 'slug',
                  'description', 'discount_price', 'images', 'sizes', 'category', 'id']

    def get_discount_price(self, obj):
        final_price = obj.final_price()
        discount_price = None if final_price == obj.price else final_price
        return discount_price

    def get_images(self, obj):
        images = []
        for image in obj.images.all():
            images.append(image.image.url)
        return images

    def get_sizes(self, obj):
        sizes = []
        for size in obj.sizes.all():
            sizes.append(size.label)
        return sizes

    def get_category(self, obj):
        return obj.category.name


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'apartment', 'zip_code',
                  'country', 'address_type', 'name', 'lastname']


class OrderUpdateSerializer(serializers.Serializer):
    size = serializers.CharField(max_length=6)
    product = serializers.IntegerField()
    quantity = serializers.IntegerField()

    def validate_size(self, data):
        size = ProductSize.objects.all().filter(label=data)
        if not size.exists():
            raise serializers.ValidationError("Valid Size Required")
        return size[0]

    def validate_product(self, data):
        try:
            product = Product.objects.get(pk=data)
            return product
        except Product.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid Product")


class OrderItemSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    size = serializers.SerializerMethodField()

    product = serializers.SerializerMethodField(read_only=True)

    read_only_fields = ['total']

    class Meta:
        model = OrderItem
        fields = ['size', 'product',
                  'quantity', 'size', 'total', 'id']

    def get_total(self, obj):
        return obj.sub_total()

    def get_product(self, obj):
        return ProductSerializer(obj.product).data

    def get_size(self, obj):
        return obj.size.label


class ProcessPaymentSerializer(serializers.Serializer):
    token = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(
        allow_blank=True, required=False)
    billing = serializers.DictField(child=serializers.CharField())
    shipping = serializers.DictField(child=serializers.CharField())

    def validate_email(self, data):
        has_password = self.initial_data.get("password")

        if has_password:
            user = User.objects.all().filter(email=data)
            if user.exists():
                raise serializers.ValidationError(
                    "Email already Exists")

        return data

    def validate_billing(self, data):
        data['address_type'] = "B"
        serializer = AddressSerializer(data=data)
        if not serializer.is_valid(raise_exception=True):
            raise serializers.ValidationError(
                serializer.error_messages)
        return data

    def validate_shipping(self, data):
        data['address_type'] = "S"
        serializer = AddressSerializer(data=data)
        if not serializer.is_valid(raise_exception=True):
            raise serializers.ValidationError(
                serializer.error_messages)
        return data


class PaymentSerializer(serializers.ModelSerializer):
    read_only_fields = ['amount', 'timestamp']

    class Meta:
        model = Payment
        fields = ['amount', 'timestamp']


class CartSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    quantity = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['total', 'items', 'quantity', 'coupon']

    def get_total(self, obj):
        return obj.calc_total_price()

    def get_items(self, obj):
        return OrderItemSerializer(obj.items.order_by("id"), many=True).data

    def get_quantity(self, obj):
        quantity = 0
        for item in obj.items.all():
            quantity += item.quantity
        return quantity

    def get_coupon(self, obj):
        return {
            'amount': obj.coupon.amount if obj.coupon else 0,
            'code': obj.coupon.code if obj.coupon else ""
        }


class OrderSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    shipping_address = AddressSerializer()
    billing_address = AddressSerializer()
    items = serializers.SerializerMethodField()
    payment = PaymentSerializer()
    coupon = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['coupon', 'shipping_address', 'billing_address',
                  'start_date', 'ordered_date', 'delivered', 'ordered', 'total', 'items', 'payment', 'id']

    def get_total(self, obj):
        return obj.calc_total_price()

    def get_coupon(self, obj):
        return obj.coupon.amount if obj.coupon else None

    def get_items(self, obj):
        print(obj)
        return OrderItemSerializer(obj.items.all(), many=True).data
