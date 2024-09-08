import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
<<<<<<< HEAD
import { HomeScreenComponent} from "./screens/home-screen/home-screen.component";
import { BusinessInsightsComponent } from "./screens/insights/insights.component";
import { NotificationScreenComponent } from "./screens/notification-screen/notification-screen.component";
import { AddPostComponent } from "./screens/add-post/add-post.component";
import { ProfileScreenComponent } from "./screens/profile-screen/profile-screen.component";
import { SearchComponent } from "./screens/search/search.component";

=======
import { customerGuard } from "./authGuards/customer/customer.guard";
import { otpScreenGuard } from "./authGuards/otpScreen/otp-screen.guard";
import { businessGuard } from "./authGuards/business/business.guard";
import { loginGuard } from "./authGuards/login/login.guard";
>>>>>>> 20f3341 (login functinality is working)

const routes: Routes = [
  { path: "", redirectTo: "business-home/home", pathMatch: "full" },

  { path: "login", loadChildren: () => import("./screens/login/login.module").then(m => m.LoginModule) },
  { path: "register", loadChildren: () => import("./screens/register/register.module").then(m => m.RegisterModule) },

  {
    path: "business-home",
    loadChildren: () => import("./screens/business-home/business-home.module").then(m => m.BusinessHomeModule),
  },
  {
<<<<<<< HEAD
    path: "consumer-home",
    loadChildren: () => import("./screens/consumer-home/consumer-home.module").then(m => m.ConsumerHomeModule),
  },

  { path: "**", redirectTo: "consumer-home/adfeed" }
=======
    path: "login",
    loadChildren: () =>
      import("./screens/login/login.module").then(
        (module) => module.LoginModule
      ),
      canActivate:[loginGuard]
  },
  {
    path: "homeCustomer",
    loadChildren: () =>
      import("./screens/home/home.module").then((module) => module.HomeModule), // replace the path of customer
    canActivate: [customerGuard],
  },
  {
    path: "otpscreen/:mobileNumber",
    loadChildren: () =>
      import("./screens/otpscreen/otpscreen.module").then(
        (module) => module.OtpscreenModule
      ),
<<<<<<< HEAD
<<<<<<< HEAD
  } 

  
  
>>>>>>> 6e5649e (Update LoginScreen1)
=======
    canActivate: [otpScreenGuard],
=======
    // canActivate: [otpScreenGuard],
>>>>>>> a8a8c40 (done changes as asked in pr)
  },
  {
    path: "homeBusiness",
    loadChildren: () =>
      import("./screens/home/home.module").then(   // replace the path of business
        (module) => module.HomeModule
      ),
    canActivate: [businessGuard],
  },
>>>>>>> 20f3341 (login functinality is working)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  exports: [RouterModule]
  exports: [RouterModule]
})
export class AppRoutingModule {}