import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessInsightsRoutingModule } from './business-insights-routing.module';
import { BusinessInsightsComponent } from './business-insights.component';
import { BusinessModuleModule } from 'src/app/business-module/business-module.module';


@NgModule({
  declarations: [
    BusinessInsightsComponent
  ],
  imports: [
    CommonModule,
    BusinessInsightsRoutingModule,
    BusinessModuleModule
  ]
})
export class BusinessInsightsModule { }
