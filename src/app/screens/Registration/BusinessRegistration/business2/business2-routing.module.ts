import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Business2Component } from './business2.component';

const routes: Routes = [
  {
    path: '',
    component: Business2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Business2RoutingModule { }
