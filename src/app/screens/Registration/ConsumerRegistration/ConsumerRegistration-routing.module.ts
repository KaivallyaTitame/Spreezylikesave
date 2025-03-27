import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerRegistration } from './ConsumerRegistration.component';

const routes: Routes = [
  {
    path: '',
    component : ConsumerRegistration
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRegistrationModule { }