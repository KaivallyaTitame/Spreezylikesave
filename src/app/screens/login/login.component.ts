import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      phonenumber: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          this.validatePhoneNumber.bind(this),
        ],
      ],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  isLoaderVisible = false;

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log("Form value:", this.form.value.phonenumber);
    // this.authService.login(this.credentials);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  validatePhoneNumber(control: {
    value: string;
  }): { invalidPhoneNumber: boolean } | null {
    const phoneNumberRegex = /^[0-9]{10}$/;
    const isValid = phoneNumberRegex.test(control.value);
    return isValid ? null : { invalidPhoneNumber: true };
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}