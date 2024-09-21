import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertPopupComponent } from '../screens/alert-popup/alert-popup.component';
import { BusinessHomeModule } from '../screens/business-home/business-home.module';
import { ConsumerHomeModule } from '../screens/consumer-home/consumer-home.module';

@NgModule({
  declarations: [
    AlertPopupComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    BusinessHomeModule,
    ConsumerHomeModule
  ],
  exports: [
    BusinessHomeModule,
    ConsumerHomeModule
  ]
})
export class ShreableModule { }
