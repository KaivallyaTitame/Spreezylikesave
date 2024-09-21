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
    canActivate: [loginGuard]
  },
  { path: "register", 
    loadChildren: () => import("./screens/register/register.module").then(m => m.RegisterModule) 
  },
  {
    path: "discover-business-screen",
    loadChildren: () => import("./screens/discover-business-screen/discover-business-screen.module").then(m => m.DiscoverBusinessScreenModule),
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
    path: "ad-feed",
    loadChildren: () =>
      import("./screens/home-screen/home-screen.module").then(
        (module) => module.HomeModule
      ),
  },
  {
    path: "feedback-screen",
    loadChildren: () =>
      import("./screens/feedback-screen/feedback-screen.module").then(
        (module) => module.FeedbackScreenModule
      ),
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
})
export class AppRoutingModule {}