import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { registerComponent } from './register.component';

const routes: Routes = [
  {
    path: '',
    component: registerComponent,
  },
  {
    path: 'business1',
    loadChildren: () =>
      import('../BusinessRegistration/businessRegistration.module')
        .then(m => m.BusinessRegistrationModule)
  },
  {
    path: 'consumer',
    loadChildren: () =>
      import('../ConsumerRegistration/ConsumerRegistration.module')
        .then(m => m.ConsumerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class registerRoutingModule { }
