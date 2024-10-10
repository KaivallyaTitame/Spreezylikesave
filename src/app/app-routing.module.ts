<<<<<<< HEAD
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
=======
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
>>>>>>> 015b527 (changes after pulling from develop)
import { customerGuard } from "./authGuards/customer/customer.guard";
import { businessGuard } from "./authGuards/business/business.guard";
import { loginGuard } from "./authGuards/login/login.guard";
>>>>>>> 20f3341 (login functinality is working)

const routes: Routes = [
  { path: "", redirectTo: "consumer-home/adfeed", pathMatch: "full" },

  {
    path: "login",
    loadChildren: () => import("./screens/login/login.module").then(m => m.LoginModule),
    canActivate: [loginGuard]
  },
  { path: "register", loadChildren: () => import("./screens/register/register.module").then(m => m.RegisterModule) },

  {
<<<<<<< HEAD
<<<<<<< HEAD
    path: "business-home",
    loadChildren: () => import("./screens/business-home/business-home.module").then(m => m.BusinessHomeModule),
=======
    path: "",
    redirectTo: "login",
    pathMatch: "full",
>>>>>>> ef5dd52 (Minor changes)
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
      import("./screens/otpScreen/otpscreen.module").then(
        (module) => module.OtpScreenModule
      ),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  } 

  
  
>>>>>>> 6e5649e (Update LoginScreen1)
=======
    canActivate: [otpScreenGuard],
=======
    // canActivate: [otpScreenGuard],
>>>>>>> a8a8c40 (done changes as asked in pr)
=======
>>>>>>> a523168 (did requested changes)
=======
    path: "business-home",
    loadChildren: () => import("./screens/business-home/business-home.module").then(m => m.BusinessHomeModule),
    canActivate: [businessGuard],
>>>>>>> 015b527 (changes after pulling from develop)
  },
  {
    path: "otpscreen/:mobileNumber",
    loadChildren: () => import("./screens/otpScreen/otpscreen.module").then(m => m.OtpScreenModule),
  },
>>>>>>> 20f3341 (login functinality is working)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  exports: [RouterModule]
})
export class AppRoutingModule {}
