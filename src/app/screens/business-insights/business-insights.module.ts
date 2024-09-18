import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessInsightsRoutingModule } from './business-insights-routing.module';
import { BusinessInsightsComponent } from './business-insights.component';
import { BusinessNavbarModule } from '../business-navbar/business-navbar.module';


@NgModule({
  declarations: [
    BusinessInsightsComponent
  ],
  imports: [
    CommonModule,
    BusinessInsightsRoutingModule,
    BusinessNavbarModule
  ]
})
export class BusinessInsightsModule { }
