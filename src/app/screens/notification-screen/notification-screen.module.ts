import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationScreenRoutingModule } from './notification-screen-routing.module';
import { NotificationScreenComponent } from './notification-screen.component';
import { BusinessNavbarModule } from '../business-navbar/business-navbar.module';


@NgModule({
  declarations: [
    NotificationScreenComponent,
  ],
  imports: [
    CommonModule,
    NotificationScreenRoutingModule,
    BusinessNavbarModule
  ]
})
export class NotificationScreenModule { }
