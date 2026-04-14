from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .serializers import ChatRequestSerializer, ProductListSerializer
from .services.openai_chat import run_chat_completion


class ProductListView(APIView):
    def get(self, request):
        qs = (
            Product.objects.filter(is_active=True)
            .prefetch_related("skus")
            .order_by("brand", "name")
        )
        serializer = ProductListSerializer(qs, many=True)
        return Response(serializer.data)


class ChatView(APIView):
    def post(self, request):
        if not settings.OPENAI_API_KEY:
            return Response(
                {"detail": "AI chat is not configured. Set OPENAI_API_KEY."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        ser = ChatRequestSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        message = ser.validated_data["message"]
        history = [
            {"role": m["role"], "content": m["content"]}
            for m in ser.validated_data.get("history") or []
        ]

        try:
            reply = run_chat_completion(message, history)
        except RuntimeError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response({"reply": reply})
