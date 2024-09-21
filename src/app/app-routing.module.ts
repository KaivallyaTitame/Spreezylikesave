import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeScreenComponent} from "./screens/home-screen/home-screen.component";
import { BusinessInsightsComponent } from "./screens/insights/insights.component";
import { NotificationScreenComponent } from "./screens/notification-screen/notification-screen.component";
import { AddPostComponent } from "./screens/add-post/add-post.component";
import { ProfileScreenComponent } from "./screens/profile-screen/profile-screen.component";

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
      import("./screens/home-screen/home-screen.module").then(
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