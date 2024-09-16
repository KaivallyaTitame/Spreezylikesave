import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConsumerBottomNavbarComponent } from 'src/app/components/consumer-bottom-navbar/consumer-bottom-navbar.component';
import { ConsumerTopNavbarComponent } from 'src/app/components/consumer-top-navbar/consumer-top-navbar.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "create",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () => import("./screens/login/login.module").then(m => m.LoginModule),
    // canActivate: [loginGuard]
  },
  { path: "register", loadChildren: () => import("./screens/register/register.module").then(m => m.RegisterModule) },

  {
    path: "home",
    loadChildren: () =>
      import("./screens/home/home.module").then(
        (module) => module.HomeModule
      ),
  },
  {
    path: "otpscreen/:mobileNumber",
    loadChildren: () => import("./screens/otpScreen/otpscreen.module").then(m => m.OtpScreenModule),
>>>>>>> c423dc1 (Fixed navbar icons and updated routing logic)
  },
  {
<<<<<<< HEAD
    path: "consumer-home",
    loadChildren: () => import("./screens/consumer-home/consumer-home.module").then(m => m.ConsumerHomeModule),
    // canActivate: [customerGuard]
  },
  {
    path:"create",
    loadChildren:() =>
      import("./screens/postcreation/postcreation.module").then(
        (module) =>module.PostcreationModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  exports: [RouterModule]
})
export class AppRoutingModule {}
