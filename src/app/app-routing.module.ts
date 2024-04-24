import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeScreenComponent} from "./screens/home-screen/home-screen.component";
import { BusinessInsightsComponent } from "./screens/insights/insights.component";
import { NotificationScreenComponent } from "./screens/notification-screen/notification-screen.component";
import { AddPostComponent } from "./screens/add-post/add-post.component";
import { ProfileScreenComponent } from "./screens/profile-screen/profile-screen.component";
import { SearchComponent } from "./screens/search/search.component";

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
  },
  {
    path: "home",
    loadChildren: () =>
      import("./screens/home/home.module").then((module) => module.HomeModule),
  },
  {
    path: "otpscreen",
    loadChildren: () =>
      import("./screens/otpscreen/otpscreen.module").then(
        (module) => module.OtpscreenModule
      ),
  } 

  
  
>>>>>>> 6e5649e (Update LoginScreen1)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  exports: [RouterModule]
  exports: [RouterModule]
})
export class AppRoutingModule {}