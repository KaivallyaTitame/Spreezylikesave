import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgIconsModule } from "@ng-icons/core";
import { ionEye, ionEyeOff } from "@ng-icons/ionicons";
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
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";

@NgModule({
  declarations: [LoginComponent],
>>>>>>> 20f3341 (login functinality is working)
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    NgIconsModule.withIcons({ ionEye, ionEyeOff })
=======
    NgIconsModule.withIcons({ ionEye, ionEyeOff }),
    LoaderComponent
>>>>>>> 20f3341 (login functinality is working)
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    LoginComponent 
  ]
})
export class LoginModule {}