import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerTopNavbarComponent } from './consumer-top-navbar/consumer-top-navbar.component';
import { ConsumerBottomNavbarComponent } from './consumer-bottom-navbar/consumer-bottom-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConsumerHomeComponent } from './consumer-home.component';
import { ConsumerHomeRoutingModule } from './consumer-home-routing.module';

@NgModule({
  declarations: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
    ConsumerHomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ConsumerHomeRoutingModule,
],
  exports: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
    ConsumerHomeComponent
  ]
})
export class ConsumerHomeModule { }
