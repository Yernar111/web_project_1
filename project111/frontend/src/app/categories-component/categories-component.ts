import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogService } from '../services/catalog-service';
import { Router } from '@angular/router';
import { CatalogComponent } from '../catalog-component/catalog-component';

@Component({
  selector: 'app-categories-component',
  imports: [CommonModule, CatalogComponent],
  templateUrl: './categories-component.html',
  styleUrl: './categories-component.css',
})
export class CategoriesComponent {
  constructor(private catalogservice: CatalogService, private route: ActivatedRoute) {}
  activeCategory_id1: number = 1;
  user_id1: number = 0;
  categories1$!: Observable<Category[]>;

  // user_id1: string | null = '';
  ngOnInit(){
    this.user_id1 = Number(this.route.snapshot.paramMap.get('id'));
    this.categories1$ = this.catalogservice.get_categories();
    console.log("initialized categories component in user id:", Number(this.user_id1));
  }

  categoryChange(i: number) {
    this.activeCategory_id1 = i;
    console.log("new active category id:", this.activeCategory_id1);
  }
}
