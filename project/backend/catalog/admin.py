from django.contrib import admin

from .models import Product, SKU


class SKUInline(admin.TabularInline):
    model = SKU
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "brand", "slug", "is_active", "updated_at")
    list_filter = ("is_active", "brand")
    search_fields = ("name", "brand", "slug")
    prepopulated_fields = {"slug": ("brand", "name")}
    inlines = [SKUInline]


@admin.register(SKU)
class SKUAdmin(admin.ModelAdmin):
    list_display = ("sku_code", "product", "price", "currency", "stock", "is_active")
    list_filter = ("is_active", "currency")
    search_fields = ("sku_code", "product__name", "product__brand")
