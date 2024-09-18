import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupComponent } from '../screens/consumer-navbar/alert-popup/alert-popup.component';
import { BusinessTopNavbarComponent } from '../business-module/business-top-navbar/business-top-navbar.component';
import { BusinessBottomNavbarComponent } from '../business-module/business-bottom-navbar/business-bottom-navbar.component';
import { ConsumerTopNavbarComponent } from '../screens/consumer-navbar/consumer-top-navbar/consumer-top-navbar.component';
import { ConsumerBottomNavbarComponent } from '../screens/consumer-navbar/consumer-bottom-navbar/consumer-bottom-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AlertPopupComponent,
    BusinessTopNavbarComponent,
    BusinessBottomNavbarComponent,
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AlertPopupComponent,
    BusinessTopNavbarComponent,
    BusinessBottomNavbarComponent,
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent
  ]
})
export class ShreableModule { }
