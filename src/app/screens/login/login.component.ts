import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Credentials } from "src/app/models/credentials";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent {
  credentials: Credentials = new Credentials();
  icon: string = "ionEyeOff";
  showPassword: boolean = false;
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      phonenumber: ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        this.validatePhoneNumber.bind(this) // Bind the function to the current instance
      ]],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit(abc:string): void {
    let xyz:string=abc
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(xyz)
    this.authService.login(this.credentials);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  toggleIcon() {
    this.icon === "ionEyeOff"
      ? (this.icon = "ionEye")
      : (this.icon = "ionEyeOff");
  }

  validatePhoneNumber(control: { value: string }): { invalidPhoneNumber: boolean } | null {
    const phoneNumberRegex = /^[0-9]{10}$/;
    const isValid = phoneNumberRegex.test(control.value);
    return isValid ? null : { invalidPhoneNumber: true };
  }
}
