import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategory: string = '';

  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  getCategory(): string {
    return this.selectedCategory;
  }
}