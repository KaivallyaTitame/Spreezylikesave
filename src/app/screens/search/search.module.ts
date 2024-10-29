import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ConsumerHomeModule } from '../consumer-home/consumer-home.module';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ConsumerHomeModule,
    BusinessHomeModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
  ] 
})
export class SearchModule { }
