from django.db import models


class Product(models.Model):
    slug = models.SlugField(max_length=180, unique=True)
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["brand", "name"]

    def __str__(self):
        return f"{self.brand} — {self.name}"


class SKU(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="skus",
        on_delete=models.CASCADE,
    )
    sku_code = models.CharField(max_length=64, unique=True)
    size = models.CharField(max_length=32, blank=True)
    color = models.CharField(max_length=64, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default="USD")
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["product", "sku_code"]
        verbose_name = "SKU"
        verbose_name_plural = "SKUs"

    def __str__(self):
        return self.sku_code
