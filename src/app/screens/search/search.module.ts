import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
<<<<<<< HEAD
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
=======
import { BusinessBottomNavbarComponent } from '../business-home/business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from '../business-home/business-top-navbar/business-top-navbar.component';
>>>>>>> 1c8e8a1 (improved folder and file structure, edited names of consumer and business navigation bars)

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
