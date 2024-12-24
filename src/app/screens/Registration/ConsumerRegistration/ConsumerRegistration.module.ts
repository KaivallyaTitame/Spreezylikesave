import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
// import { NgIconsModule } from "@ng-icons/core";
// import { ionEye, ionEyeOff } from "@ng-icons/ionicons";
import { RegisterRoutingModule } from "./ConsumerRegistration-routing.module";
import { RegisterComponent } from "./ConsumerRegistration.component";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    // NgIconsModule.withIcons({ ionEye, ionEyeOff }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RegisterModule {}