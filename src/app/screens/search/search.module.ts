import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
=======
import { BusinessBottomNavbarComponent } from '../business-home/business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from '../business-home/business-top-navbar/business-top-navbar.component';
>>>>>>> 1c8e8a1 (improved folder and file structure, edited names of consumer and business navigation bars)
=======
import { ConsumerHomeModule } from '../consumer-home/consumer-home.module';
import { BusinessHomeModule } from '../business-home/business-home.module';



@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ConsumerHomeModule,
    BusinessHomeModule
  ],
  exports: [
    SearchComponent,
  ] 
})
export class SearchModule { }
