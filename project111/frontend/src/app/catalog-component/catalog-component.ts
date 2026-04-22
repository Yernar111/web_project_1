import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogService } from '../services/catalog-service';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Favorites } from '../models/favorite';

@Component({
  selector: 'app-catalog-component',
  imports: [CommonModule],
  templateUrl: './catalog-component.html',
  styleUrl: './catalog-component.css',
})
export class CatalogComponent {
  constructor(private catalogservice: CatalogService, private router: Router) {}
  products1$!: Observable<Product[]>;
  @Input() activeCategory_id!: number;
  // @Input() user_id!: string;
  // @Input() user_id: string | null = '';
  // user_id1: string | null = '';
  @Input() user_id!: number;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeCategory_id']) {
      console.log("active_category is:", this.activeCategory_id)
      if (this.activeCategory_id == 1) {
        this.products1$ = this.catalogservice.get_products();
      } else if (this.activeCategory_id == 4){
        this.products1$ = this.catalogservice.get_liked_products(Number(this.user_id));
        console.log("liked products by user with id:", this.user_id);
      }
      else{
        this.products1$ = this.catalogservice.get_products_by_category(this.activeCategory_id);
      }
    }
  }
  addFavorite(product_id: number){
    const favoriteProduct: Favorites = {id: 0, user_id: 0, product_id: 0};
    favoriteProduct.user_id = Number(this.user_id);
    favoriteProduct.product_id = product_id;
    this.catalogservice.is_liked(Number(this.user_id), product_id).subscribe({
      next: (data) => {
        this.catalogservice.remove_a_like(Number(this.user_id), product_id).subscribe(data => console.log("removed a like from:", data));
      },
      error: (err) => {
        if (err.status === 404) {
          this.catalogservice.like_a_product(favoriteProduct).subscribe(data1 => console.log("liked:", data1));
        }
      }
    })
  }
  openCard(id: number){
    this.router.navigate(['/product', id])
  }
  
}
