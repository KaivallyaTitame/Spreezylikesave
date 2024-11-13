import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category-selector.service';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  selectedCategory: string = '';

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.selectedCategory = this.categoryService.getCategory();
  }

  onSelectCategory(event: any): void {
    this.selectedCategory = event.target.value;
    this.categoryService.setCategory(this.selectedCategory);

    switch (this.selectedCategory) {
      case 'Post':
        this.router.navigate(['create/post-form']);
        break;
      case 'Coupon Code':
        this.router.navigate(['create/coupon-code']);
        break;
      case 'Event':
        this.router.navigate(['create/events-form']);
        break;
      default:
        break;
    }
  }
}