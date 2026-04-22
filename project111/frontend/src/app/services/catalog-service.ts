import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Favorites } from '../models/favorite';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}


  get_categories(): Observable<Category[]>{
    return this.http.get<Category[]>(`http://127.0.0.1:8000/categories/`);
  }

  get_products(): Observable<Product[]> {
      return this.http.get<Product[]>(`http://127.0.0.1:8000/products/`);
  }

  get_products_by_category(category_id: number): Observable<Product[]> {
      return this.http.get<Product[]>(`http://127.0.0.1:8000/products/by_category/${category_id}`);
  }

  get_product(product_id: number): Observable<Product>{
    return this.http.get<Product>(`http://127.0.0.1:8000/products/${product_id}`);
  }

  get_liked_products(id: number): Observable<Product[]> {
      return this.http.get<Product[]>(`http://127.0.0.1:8000/likes/${id}`);
  }
  //
  like_a_product(v1: Favorites): Observable<Favorites>{
    return this.http.post<Favorites>(`http://127.0.0.1:8000/likes/`, v1);
  }

  is_liked(user_id: number, product_id: number): Observable<Favorites>{
    return this.http.get<Favorites>(`http://127.0.0.1:8000/likes/${user_id}/${product_id}/`);
  }

  remove_a_like(user_id: number, product_id: number): Observable<Favorites>{
    return this.http.delete<Favorites>(`http://127.0.0.1:8000/likes/${user_id}/${product_id}/`);
  }
  
}
