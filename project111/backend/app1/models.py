from django.db import models

class User(models.Model):
    name = models.CharField(max_length=20,  db_column="name")
    password = models.CharField(max_length=20, db_column="password")

    class Meta:
        db_table = "users"
        managed = False

class Categories(models.Model):
    name = models.CharField(max_length=20,  db_column="name")

    class Meta:
        db_table = "categories1"
        managed = False

class Products(models.Model):
    name = models.CharField(max_length=20,  db_column="name")
    price = models.FloatField(db_column="price")
    description = models.CharField(db_column="description")
    image_url = models.CharField(db_column="image_url")
    category_id = models.ForeignKey(Categories, on_delete=models.CASCADE, db_column='category_id')

    class Meta:
        db_table = "products"
        managed = False

class Favorites(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE, db_column='product_id')

    class Meta:
        db_table = "favorites"
        managed = False

# Create your models here.
