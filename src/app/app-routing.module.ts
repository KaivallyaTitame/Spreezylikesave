import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { customerGuard } from "./authGuards/customer/customer.guard";
import { businessGuard } from "./authGuards/business/business.guard";
import { loginGuard } from "./authGuards/login/login.guard";

import { ProfileScreenModule } from './screens/profile-screen/profile-screen.module';


const routes: Routes = [
  { 
    path: "", redirectTo: "login", pathMatch: "full" 
  },
  {
    path: "login",
    loadChildren: () => import("./screens/login/login.module").then(m => m.LoginModule),
    canActivate: [loginGuard]
  },
  {
    path: "profile-screen",
    loadChildren: () => import("./screens/profile-screen/profile-screen.module").then(m => ProfileScreenModule)
  },
  {
    path: "discover-business-screen",
    loadChildren: () => import("./screens/discover-business-screen/discover-business-screen.module").then(m => m.DiscoverBusinessScreenModule),
  },
  {
    path: "business-home",
    loadChildren: () => import("./screens/business-home/business-home.module").then(m => m.BusinessHomeModule),
    // canActivate: [businessGuard]
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
    path: 'terms-conditions', loadChildren: () => import('./screens/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) 
  },
  {
    path: 'register',
    loadChildren: () => import('./screens/Registration/register/register.module').then(m => m.registerModule),
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./screens/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule),
  },
  // { path: "**", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}