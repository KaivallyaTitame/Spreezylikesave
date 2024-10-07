import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHomeRoutingModule } from '../business-home/business-home-routing.module';
import { InsightsComponent } from './insights.component';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { RouterModule, Routes } from '@angular/router';
import { InsightsRoutingModule } from './insights-routing.module';

const routes: Routes = [
  { path: '', component: InsightsComponent }
];

@NgModule({
  declarations: [
    InsightsComponent
  ],
  imports: [
    CommonModule,
    InsightsRoutingModule,
    BusinessHomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    InsightsComponent
  ],
})
export class InsightsModule { }
