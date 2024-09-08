import { Component } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent {
  user: User = new User();
  form: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    username: new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    confirmPolicies: new FormControl(false, [Validators.requiredTrue]),
  });

  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;
  newPasswordIcon: string = "ionEyeOff";
  confirmPasswordIcon: string = "ionEyeOff";

  constructor(private customerService: CustomerService) {}

  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
    this.toggleNewPasswordIcon();
  }

  toggleConfirmNewPassword() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
    this.toggleConfirmPasswordIcon();
  }

  toggleNewPasswordIcon() {
    this.newPasswordIcon === "ionEyeOff"
      ? (this.newPasswordIcon = "ionEye")
      : (this.newPasswordIcon = "ionEyeOff");
  }

  public toggleConfirmPasswordIcon() {
    this.confirmPasswordIcon === "ionEyeOff"
      ? (this.confirmPasswordIcon = "ionEye")
      : (this.confirmPasswordIcon = "ionEyeOff");
  }

  registerUser() {
    this.user = this.mapUserData(this.form);
    this.customerService.registerNewUser(this.user);
  }

  mapUserData(form: FormGroup): User {
    let user = new User();
    user.firstName = form.get("firstName")?.value;
    user.lastName = form.get("lastName")?.value;
    user.email = form.get("email")?.value;
    user.username = form.get("username")?.value;
    user.password = form.get("password")?.value;

    return user;
  }
}
