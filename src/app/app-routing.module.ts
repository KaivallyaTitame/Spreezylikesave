import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './authGuards/login/login.guard';
import { businessGuard } from './authGuards/business/business.guard';
import { customerGuard } from './authGuards/customer/customer.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: "login",
    loadChildren: () => import("./screens/login/login.module").then(m => m.LoginModule),
    canActivate: [loginGuard]
  },
  { path: "register", 
    loadChildren: () => import("./screens/Registration/register/register.module").then(m => m.RegisterModule) 
  },
  {
    path: 'business-home',
    loadChildren: () => import('./screens/business-home/business-home.module').then(m => m.BusinessHomeModule),
  },
  {
    path: "business-home",
    loadChildren: () => import("./screens/business-home/business-home.module").then(m => m.BusinessHomeModule),
    canActivate: [businessGuard]
  },
  {
    path: "otpscreen/:mobileNumber/:countryCode",
    loadChildren: () => import("./screens/otpScreen/otpscreen.module").then(m => m.OtpScreenModule),
  },
  {
    path: "consumer-home",
    loadChildren: () => import("./screens/consumer-home/consumer-home.module").then(m => m.ConsumerHomeModule),
    canActivate: [customerGuard]
  },
  {
    path: 'business1',
    loadChildren: () => import('./screens/Registration/BusinessRegistration/businessRegistration.module').then(m => m.BusinessRegistrationModule),  // Updated path here
  },
  { path: '**', redirectTo: 'consumer-home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
