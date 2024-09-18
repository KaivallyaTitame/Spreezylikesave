import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileScreenRoutingModule } from './profile-screen-routing.module';
import { ProfileScreenComponent } from './profile-screen.component';
import { BusinessNavbarModule } from '../business-navbar/business-navbar.module';

@NgModule({
  declarations: [
    ProfileScreenComponent
  ],
  imports: [
    CommonModule,
    ProfileScreenRoutingModule,
    BusinessNavbarModule
  ]
})
export class ProfileScreenModule { }
