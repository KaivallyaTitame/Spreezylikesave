import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationScreenRoutingModule } from './notification-screen-routing.module';
import { NotificationScreenComponent } from './notification-screen.component';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { ConsumerHomeModule } from '../consumer-home/consumer-home.module';

@NgModule({
  declarations: [
    NotificationScreenComponent
  ],
  imports: [
    CommonModule,
    NotificationScreenRoutingModule,
    BusinessHomeModule,
    ConsumerHomeModule,
    
  ],
  exports: [ 
    NotificationScreenComponent
  ]
})
export class NotificationScreenModule { }
