from decimal import Decimal

from django.core.management.base import BaseCommand

from catalog.models import Product, SKU

DEMO = [
    {
        "slug": "atelier-noir-coat",
        "name": "Sculpted Coat",
        "brand": "ATELIER NOIR",
        "description": "Architectural silhouette, midnight wool.",
        "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        "skus": [
            {"sku_code": "AN-COAT-S", "size": "S", "price": "420.00"},
            {"sku_code": "AN-COAT-M", "size": "M", "price": "420.00"},
        ],
    },
    {
        "slug": "runway-code-dress",
        "name": "Column Dress",
        "brand": "RUNWAY CODE",
        "description": "Linear drape for evening light.",
        "image_url": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
        "skus": [
            {"sku_code": "RC-DR-36", "size": "36", "price": "510.00"},
        ],
    },
    {
        "slug": "mono-edit-tailoring",
        "name": "Precision Blazer",
        "brand": "MONO EDIT",
        "description": "Sharp lapels, zero noise.",
        "image_url": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80",
        "skus": [
            {"sku_code": "ME-BLZ-48", "size": "48", "price": "290.00"},
        ],
    },
    {
        "slug": "city-tailor-look",
        "name": "Urban Layer",
        "brand": "CITY TAILOR",
        "description": "Movement-first tailoring.",
        "image_url": "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1200&q=80",
        "skus": [
            {"sku_code": "CT-LYR-M", "size": "M", "price": "380.00"},
        ],
    },
]


class Command(BaseCommand):
    help = "Load demo products and SKUs for local development."

    def handle(self, *args, **options):
        for row in DEMO:
            skus = row.pop("skus")
            product, _ = Product.objects.update_or_create(
                slug=row["slug"],
                defaults={
                    "name": row["name"],
                    "brand": row["brand"],
                    "description": row["description"],
                    "image_url": row["image_url"],
                    "is_active": True,
                },
            )
            for s in skus:
                SKU.objects.update_or_create(
                    sku_code=s["sku_code"],
                    defaults={
                        "product": product,
                        "size": s.get("size", ""),
                        "color": s.get("color", ""),
                        "price": Decimal(s["price"]),
                        "currency": "USD",
                        "stock": 10,
                        "is_active": True,
                    },
                )
        self.stdout.write(self.style.SUCCESS("Demo catalog seeded."))
