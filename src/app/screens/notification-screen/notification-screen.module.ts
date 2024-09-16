import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationScreenRoutingModule } from './notification-screen-routing.module';
import { NotificationScreenComponent } from './notification-screen.component';
// import { ComponentsModule } from 'src/app/components/components.module';
import { BusinessModuleModule } from "src/app/business-module/business-module.module";

@NgModule({
  declarations: [
    NotificationScreenComponent
  ],
  imports: [
    CommonModule,
    NotificationScreenRoutingModule,
    BusinessModuleModule  
  ]
})
export class NotificationScreenModule { }
