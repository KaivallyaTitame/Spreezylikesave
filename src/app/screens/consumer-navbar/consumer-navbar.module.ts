import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerNavbarRoutingModule } from './consumer-navbar-routing.module';
import { ConsumerNavbarComponent } from './consumer-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ShreableModule } from 'src/app/shreable/shreable.module';
import { ComponentsModule } from 'src/app/components/components.module';
// import { ConsumerTopNavbarComponent } from 'src/app/components/consumer-top-navbar/consumer-top-navbar.component';
// import { ConsumerBottomNavbarComponent } from 'src/app/components/consumer-bottom-navbar/consumer-bottom-navbar.component';



@NgModule({
  declarations: [
    ConsumerNavbarComponent,
    // ConsumerTopNavbarComponent,
    // ConsumerBottomNavbarComponent
  ],
  imports: [
    CommonModule,
    ConsumerNavbarRoutingModule,
    FontAwesomeModule,
    // ShreableModule,
    ComponentsModule
  ]
})
export class ConsumerNavbarModule { }
