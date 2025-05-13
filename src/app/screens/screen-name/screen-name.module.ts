import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenNameRoutingModule } from './screen-name-routing.module';
import { ScreenNameComponent } from './screen-name.component';


@NgModule({
  declarations: [
    ScreenNameComponent
  ],
  imports: [
    CommonModule,
    ScreenNameRoutingModule
  ]
})
export class ScreenNameModule { }
