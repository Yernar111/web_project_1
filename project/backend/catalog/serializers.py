from rest_framework import serializers

from .models import Product, SKU


class ChatMessageSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=["user", "assistant"])
    content = serializers.CharField(max_length=8000)


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=4000)
    history = ChatMessageSerializer(many=True, required=False, default=list)


class SKUListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKU
        fields = ("sku_code", "size", "color", "price", "currency", "stock")


class ProductListSerializer(serializers.ModelSerializer):
    display_price = serializers.SerializerMethodField()
    currency = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "slug",
            "name",
            "brand",
            "description",
            "image_url",
            "display_price",
            "currency",
        )

    def get_display_price(self, obj):
        skus = [s for s in obj.skus.all() if s.is_active]
        if not skus:
            return None
        return min(s.price for s in skus)

    def get_currency(self, obj):
        skus = [s for s in obj.skus.all() if s.is_active]
        if not skus:
            return "USD"
        min_sku = min(skus, key=lambda s: s.price)
        return min_sku.currency
