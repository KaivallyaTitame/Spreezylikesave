import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { BusinessRegistrationModule } from '../BusinessRegistration/businessRegistration.module';
import { RegisterModule } from '../ConsumerRegistration/ConsumerRegistration.module';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    BusinessRegistrationModule,
    RegisterModule
  ]
})
export class WelcomeModule { }
