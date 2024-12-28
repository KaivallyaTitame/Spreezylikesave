import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { registerModule } from "../Registration/register/register.module";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: 'register',
    loadChildren: () => import('../Registration/register/register.module').then(m => m.registerModule),  // Updated path here
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
