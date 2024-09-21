import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { BusinessBottomNavbarComponent } from '../business-home/business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from '../business-home/business-top-navbar/business-top-navbar.component';

@NgModule({
  declarations: [
    SearchComponent,

  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  exports: [
    SearchComponent,
  ] 
})
export class SearchModule { }
