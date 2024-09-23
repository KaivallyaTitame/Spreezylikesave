import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent {
  selectedCategory: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelectCategory(event: any): void {
    this.selectedCategory = event.target.value;
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