from django.urls import path

from .views import ChatView, ProductListView

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("chat/", ChatView.as_view(), name="chat"),
]
