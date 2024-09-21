import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationScreenRoutingModule } from './notification-screen-routing.module';
import { NotificationScreenComponent } from './notification-screen.component';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { BusinessBottomNavbarComponent } from '../business-home/business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from '../business-home/business-top-navbar/business-top-navbar.component';


@NgModule({
  declarations: [
    NotificationScreenComponent
  ],
  imports: [
    CommonModule,
    NotificationScreenRoutingModule,
  ],
  exports: [ 
    NotificationScreenComponent
  ]
})
export class NotificationScreenModule { }
