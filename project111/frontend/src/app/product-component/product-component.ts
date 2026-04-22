import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogService } from '../services/catalog-service';


@Component({
  selector: 'app-product-component',
  imports: [CommonModule],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent {
  constructor(private catalogservice: CatalogService, private route: ActivatedRoute) {}
  product_id1: string | null = '';
  product1$!: Observable<Product>;
  ngOnInit(){
    this.product_id1 = this.route.snapshot.paramMap.get('id');
    this.product1$ = this.catalogservice.get_product(Number(this.product_id1));
  }

}
