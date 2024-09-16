import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessInsightsComponent } from './business-insights.component';

const routes: Routes = [
  {
    path: '',
    component : BusinessInsightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessInsightsRoutingModule { }
