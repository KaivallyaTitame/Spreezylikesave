import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
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
