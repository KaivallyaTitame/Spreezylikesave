import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Business1Component } from './business1/business1.component';
import { Business2Component } from './business2/business2.component';
import { Business3Component } from './business3/business3.component';
import { BusinessRegistrationRoutingModule } from './businessRegistration-routing.module';

@NgModule({
  declarations: [
    Business1Component,
    Business2Component,
    Business3Component,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BusinessRegistrationRoutingModule,
  ],
  // exports: [ 
  //      Business1Component,
  //       Business2Component,
  //      Business3Component,
  //     ],
})
export class BusinessRegistrationModule {}
