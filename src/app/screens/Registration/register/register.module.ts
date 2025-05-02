import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerRoutingModule } from './register-routing.module';
import { registerComponent } from './register.component';
import { BusinessRegistrationModule } from '../BusinessRegistration/businessRegistration.module';
import { ConsumerModule } from '../ConsumerRegistration/ConsumerRegistration.module';

@NgModule({
  declarations: [
    registerComponent
  ],
  imports: [
    CommonModule,
    registerRoutingModule,
    BusinessRegistrationModule,
    ConsumerModule
  ]
})
export class registerModule { }
