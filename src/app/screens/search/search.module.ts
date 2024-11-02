import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
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
    FontAwesomeModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
  ] 
})
export class SearchModule { }
