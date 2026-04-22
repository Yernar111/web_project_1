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
  favoriteProduct: Favorites = {id: 0, user_id: 0, product_id: 0};
  isLiked: boolean = false;
  addFavorite(product_id: number){
    this.favoriteProduct.user_id = Number(this.user_id);
    this.favoriteProduct.product_id = product_id; 
    if (!this.isLiked){
      this.catalogservice.like_a_product(this.favoriteProduct).subscribe(data => {
        console.log("liked:", data);
        this.isLiked=true;
      })
    }
    else{
      this.catalogservice.remove_a_like(Number(this.user_id), product_id).subscribe(data => {
        console.log("removed a like from:", data);
        this.isLiked=false;
      })
    }
  }
  openCard(id: number){
    this.router.navigate(['/product', id])
  }
  
}
