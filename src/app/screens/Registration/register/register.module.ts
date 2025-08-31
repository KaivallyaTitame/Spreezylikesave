import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerRoutingModule } from './register-routing.module';
import { registerComponent } from './register.component';
import { BusinessRegistrationModule } from '../BusinessRegistration/businessRegistration.module';
import { ConsumerModule } from '../ConsumerRegistration/ConsumerRegistration.module';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  declarations: [
    registerComponent
  ],
  imports: [
    CommonModule,
    registerRoutingModule,
    BusinessRegistrationModule,
    ConsumerModule, 
    SharedModule
  ]
})
export class registerModule { }
