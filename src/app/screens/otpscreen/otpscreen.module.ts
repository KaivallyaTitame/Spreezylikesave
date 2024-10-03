import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpscreenRoutingModule } from './otpscreen-routing.module';
import { OtpscreenComponent } from './otpscreen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { LoaderComponent } from 'src/app/components/loader/loader.component';



@NgModule({
  declarations: [
   OtpscreenComponent
    ],
  imports: [
    CommonModule,
    OtpscreenRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class OtpscreenModule { }