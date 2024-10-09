import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpScreenRoutingModule } from './otpscreen-routing.module';
import { OtpscreenComponent } from './otpscreen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
import { LoaderComponent } from 'src/app/components/loader/loader.component';



@NgModule({
  declarations: [
   OtpscreenComponent
    ],
  imports: [
    CommonModule,
    OtpScreenRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OtpScreenModule { }