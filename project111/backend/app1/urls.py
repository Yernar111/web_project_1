from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UserApiView, ProductsViewSet, FavoritesViewSet, get_categories, get_products_by_category, is_liked, LikesAPIView

# from .views import remove_a_like, get_likes, like_a_product

from django.views.decorators.csrf import csrf_exempt

from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
# router.register('categories', CategoriesViewSet, basename='categories')
# router.register('categories', get_categories, basename='categories')
router.register('products', ProductsViewSet, basename='products')
# router.register('likes', FavoritesViewSet, basename='likes')

urlpatterns = router.urls

urlpatterns +=[
    path('users/', csrf_exempt(UserApiView.as_view())),
    path("users/<str:name>/<str:password>/", csrf_exempt(UserApiView.as_view())),
    path('categories/', get_categories),
    path('products/by_category/<int:category_id>/', get_products_by_category),
    # path('likes/<int:user_id>/', get_likes),
    # path('likes/', like_a_product),
    # path('likes/<int:user_id>/<int:product_id>/', remove_a_like),
    path('likes/<int:user_id>/', csrf_exempt(LikesAPIView.as_view())),
    path('likes/', csrf_exempt(LikesAPIView.as_view())),
    path('likes/<int:user_id>/<int:product_id>/', csrf_exempt(LikesAPIView.as_view())),
    path('likes/<int:user_id>/<int:product_id>/', is_liked),
    # path('api/token/', obtain_auth_token)

]