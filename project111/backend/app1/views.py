from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User, Categories, Products, Favorites
from .serializers import UserSerializer, CategoriesSerializer, ProductsSerializer, FavoritesSerializer

from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response

from django.http import HttpResponse, JsonResponse

from rest_framework import status

from django.views.decorators.csrf import csrf_exempt

from rest_framework.permissions import IsAuthenticated

class UserApiView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, name, password):
        a = User.objects.get(name=name, password=password)
        if not a:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(a)
        return Response(serializer.data, status=200)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def get_categories(request):
    categories =  Categories.objects.all()
    data = list(categories.values())
    return JsonResponse(data, safe=False)

# class CategoriesViewSet(ModelViewSet):
#     queryset = Categories.objects.all()
#     serializer_class = CategoriesSerializer

class ProductsViewSet(ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

@csrf_exempt
def get_products_by_category(request, category_id):
    products = Products.objects.filter(category_id=category_id)
    if not products:
        return JsonResponse({"error": "User not found"}, status=404)
    serializer = ProductsSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False, status=200) 


class FavoritesViewSet(ModelViewSet):
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer

class LikesAPIView(APIView):
    def get(self, request, user_id):
        a = Products.objects.get(user_id=user_id)
        if not a:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductsSerializer(a)
        return Response(serializer.data, status=200)
    
    def post(self, request):
        serializer = FavoritesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, user_id, product_id):
        favorite = Favorites.objects.filter(
            user_id=user_id,
            product_id=product_id
        ).first()

        serializer = FavoritesSerializer(favorite)
        favorite.delete()
        return Response(serializer.data, status=200)

@csrf_exempt
def is_liked(request, user_id, product_id):
    favorite = Favorites.objects.filter(
        user_id=user_id,
        product_id=product_id
    ).first()

    if not favorite:
        return JsonResponse({"error": "Is not liked"}, status=404)

    serializer = FavoritesSerializer(favorite)
    return JsonResponse(serializer.data, safe=False, status=200)

# @csrf_exempt
# def get_likes(request, user_id):
#     favorites = Products.objects.filter(favorites__user_id=user_id)
#     serializer = ProductsSerializer(favorites, many=True)
#     return JsonResponse(serializer.data, safe=False, status=200)

# @csrf_exempt
# def like_a_product(request):
#     serializer = FavoritesSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return JsonResponse(serializer.data, status=201)
#     return JsonResponse(serializer.errors, status=400)
    

# @csrf_exempt
# def remove_a_like(request, user_id, product_id):
#     favorite = Favorites.objects.get(user_id=user_id, product_id=product_id)
#     serializer = FavoritesSerializer(favorite)
#     return Response(serializer.data, status=200)

# Create your views here.
