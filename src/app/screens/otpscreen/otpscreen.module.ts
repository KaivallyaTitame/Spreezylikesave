import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpscreenRoutingModule } from './otpscreen-routing.module';
import { OtpscreenComponent } from './otpscreen.component';


@NgModule({
  declarations: [
    OtpscreenComponent
  ],
  imports: [
    CommonModule,
    OtpscreenRoutingModule
  ]
})
export class OtpscreenModule { }
