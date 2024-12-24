import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'business1',
    loadChildren: () =>
      import('../BusinessRegistration/businessRegistration.module')
        .then(m => m.BusinessRegistrationModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../ConsumerRegistration/ConsumerRegistration.module')
        .then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule { }
