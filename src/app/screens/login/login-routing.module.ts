import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { WelcomeModule } from "../Registration/welcome/welcome.module";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: 'welcome',
    loadChildren: () => import('../Registration/welcome/welcome.module').then(m => m.WelcomeModule),  // Updated path here
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
