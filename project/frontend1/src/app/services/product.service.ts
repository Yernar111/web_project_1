import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ProductDto } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly base = `${environment.apiBaseUrl}/api`;

  constructor(private http: HttpClient) {}

  list(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.base}/products/`);
  }
}
