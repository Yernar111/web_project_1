from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UserApiView, ProductsViewSet, FavoritesViewSet, get_categories, get_products_by_category, remove_a_like

from django.views.decorators.csrf import csrf_exempt

router = DefaultRouter()
# router.register('categories', CategoriesViewSet, basename='categories')
# router.register('categories', get_categories, basename='categories')
router.register('products', ProductsViewSet, basename='products')
router.register('likes', FavoritesViewSet, basename='likes')

urlpatterns = router.urls

urlpatterns +=[
    path('users/', csrf_exempt(UserApiView.as_view())),
    path("users/<str:name>/<str:password>/", csrf_exempt(UserApiView.as_view())),
    path('categories/', get_categories),
    path('products/by_category/<int:category_id>/', get_products_by_category),
    path('likes/<int:user_id>/<int:product_id>/', remove_a_like)
]