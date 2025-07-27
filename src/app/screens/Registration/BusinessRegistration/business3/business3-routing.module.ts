import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Business3Component } from './business3.component';

const routes: Routes = [
  {
    path: '',
    component: Business3Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Business3RoutingModule { }
