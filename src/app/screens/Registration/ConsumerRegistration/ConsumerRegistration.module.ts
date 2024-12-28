import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ConsumerRegistrationModule } from "./ConsumerRegistration-routing.module";
import { ConsumerRegistration } from "./ConsumerRegistration.component";

@NgModule({
  declarations: [ConsumerRegistration],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConsumerRegistrationModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ConsumerModule {}