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


class OrderItemSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    product = ProductSerializer()
    size = ProductSizeSerializer()

    class Meta:
        model = OrderItem
        fields = ['size', 'product',
                  'quantity', 'size', 'total']

    def get_total(self, obj):
        return obj.product.final_price() * obj.quantity


class OrderSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['coupon', 'shipping_address', 'billing_address',
                  'start_date', 'ordered_date', 'delivered', 'ordered']

    def get_total(self, obj):
        return obj.calc_total_price()
