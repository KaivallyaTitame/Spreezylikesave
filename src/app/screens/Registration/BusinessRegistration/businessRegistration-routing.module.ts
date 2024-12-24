import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Business1Component } from './business1/business1.component';
import { Business2Component } from './business2/business2.component';
import { Business3Component } from './business3/business3.component';

const routes: Routes = [
  {
    path: '',
    component: Business1Component
  },
  {
    path: 'business2',
    component: Business2Component,
  },
  {
    path: 'business3',
    component: Business3Component,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRegistrationRoutingModule {}
