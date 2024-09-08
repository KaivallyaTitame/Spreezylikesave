import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { NgIconsModule } from "@ng-icons/core";
import { ionEye, ionEyeOff } from "@ng-icons/ionicons";
<<<<<<< HEAD
<<<<<<< HEAD
import { AlertPopupComponent } from "src/app/screens/alert-popup/alert-popup.component";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { BusinessHomeModule } from "../business-home/business-home.module";
 


@NgModule({
  declarations: [
    LoginComponent
  ],
=======
=======
import { AlertPopupComponent } from "src/app/components/alert-popup/alert-popup.component";
>>>>>>> a8a8c40 (done changes as asked in pr)
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
<<<<<<< HEAD
  declarations: [LoginComponent],
>>>>>>> 20f3341 (login functinality is working)
=======
  declarations: [LoginComponent, AlertPopupComponent],
>>>>>>> a8a8c40 (done changes as asked in pr)
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    NgIconsModule.withIcons({ ionEye, ionEyeOff })
=======
    NgIconsModule.withIcons({ ionEye, ionEyeOff }),
<<<<<<< HEAD
    LoaderComponent
>>>>>>> 20f3341 (login functinality is working)
=======
>>>>>>> a8a8c40 (done changes as asked in pr)
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    LoginComponent 
  ]
})
export class LoginModule {}
