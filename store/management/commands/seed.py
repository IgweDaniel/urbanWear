from django.core.management.base import BaseCommand, CommandError

import json
from store.models import Product, ProductImage, Category, ProductSize, Category
from django.core.files.base import ContentFile

from django.db import IntegrityError
from django.conf import settings

BASE_DIR = settings.BASE_DIR


class Command(BaseCommand):
    help = 'populates the database with sample products'

    def add_arguments(self, parser):
        parser.add_argument('file', type=str,
                            help='Indicates file to grab JSON seed data')

    def handle(self, *args, **kwargs):

        file = kwargs['file']
        with open(BASE_DIR / file) as f:
            data = json.load(f)

        for size in data['sizes']:
            try:
                ProductSize.objects.create(
                    label=size
                )
            except IntegrityError:
                self.stdout.write(f"{size} already in db")
                continue

        self.stdout.write("All Sizes have been added")

        for category in data['categories']:
            try:
                Category.objects.create(
                    name=category
                )
            except IntegrityError:
                self.stdout.write(f"{category} already in db")
                continue

        self.stdout.write("All Categories have been added")

        for product in data['products']:
            category = Category.objects.filter(name=product['category'])
            if not category.exists():
                self.stdout.write(
                    f"{product['name']} was NOT seeded succesfully")
                continue
            category = category[0]
            sizes = []
            for product_size in product["sizes"]:
                size = ProductSize.objects.filter(label=product_size)
                if not size.exists():
                    continue
                sizes.append(size[0])

            try:
                new_product = Product.objects.create(
                    name=product['name'], price=10,
                    description=product['desc'],
                    slug=product['name'].replace(" ", "-"),
                    category=category)
            except Exception:
                continue

            new_product.sizes.set(sizes)
            for product_image in product['images']:
                filename = product_image
                with open(BASE_DIR / "tmp" / filename, 'rb') as f:
                    image = ProductImage.objects.create(
                        product=new_product,
                    )

                    data = f.read()
                    image.image.save(

                        filename, ContentFile(data))

        self.stdout.write("All ProductItems have been added")
