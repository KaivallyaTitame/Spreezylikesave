import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Business1Component } from './business1.component';

const routes: Routes = [
  {
    path: '',
    component: Business1Component
  },
  {
    path: 'business1',
    component: Business1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Business1RoutingModule { }
