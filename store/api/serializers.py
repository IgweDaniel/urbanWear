from rest_framework import serializers
from store.models import Product, ProductImage, ProductSize, Address, Order, OrderItem


class ProductImageSerialiser(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    alt = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ('alt', 'url')

    def get_url(self, obj):
        return obj.image.url

    def get_alt(self, obj):
        return obj.product.name


class ProductSizeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = ProductSize
        fields = ['name', 'label']

    def get_name(self, obj):
        return obj.get_label_display()


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
        return ProductImageSerialiser(obj.images.all(), many=True).data

    def get_sizes(self, obj):
        return ProductSizeSerializer(obj.sizes.all(), many=True).data

    def get_category(self, obj):
        return {
            'name': obj.category.name,
            'image': obj.category.image.url,
            'id': obj.category.id
        }


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'apartment', 'zip_code', 'country', 'address_type']


# size = ProductSizeSerializer()

class OrderUpdateSerializer(serializers.Serializer):
    size = serializers.CharField(max_length=6)
    product = serializers.IntegerField()
    quantity = serializers.IntegerField()

    def validate_size(self, data):
        size = ProductSize.objects.all().filter(label=data)
        if not size.exists():
            print("error")
            raise serializers.ValidationError("Valid Size Required")
        return size[0]

    def validate_product(self, data):
        try:
            product = Product.objects.get(pk=data)
            return product
        except Product.DoesNotExist:
            print("error")
            raise serializers.ValidationError("Invalid Product")

    # def validate_quantity(self, data):
    #     try:
    #         int(data)
    #     except TypeError:
    #         print(data)
    #     return data


class OrderItemSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    read_only_fields = ['total']

    class Meta:
        model = OrderItem
        fields = ['size', 'product',
                  'quantity', 'size', 'total']

    def get_total(self, obj):
        return obj.sub_total()

    def get_product(self, obj):
        product = obj.product
        return {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "final_price": product.final_price(),
            "category": product.category.name

        }

    def get_size(self, obj):
        return obj.size.label


class OrderSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    shipping_address = AddressSerializer()
    billing_address = AddressSerializer()

    class Meta:
        model = Order
        fields = ['coupon', 'shipping_address', 'billing_address',
                  'start_date', 'ordered_date', 'delivered', 'ordered', 'total', 'items']

    def get_total(self, obj):
        return obj.calc_total_price()

    def get_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data
