import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgIconsModule } from "@ng-icons/core";
import { ionEye, ionEyeOff } from "@ng-icons/ionicons";
import { AlertPopupComponent } from "src/app/screens/alert-popup/alert-popup.component";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { BusinessHomeModule } from "../business-home/business-home.module";
import { SharedModule } from "src/app/shared/shared-module/shared-module.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ ionEye, ionEyeOff }),
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    LoginComponent 
  ]
})
export class LoginModule {}
