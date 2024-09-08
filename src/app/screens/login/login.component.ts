import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OtpService } from "src/app/services/otp/otp.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent {
  form: FormGroup;
  submitted: boolean = false;
  otpSent: boolean = false;

  constructor(
    private authService: AuthService,
    private otpService: OtpService,
    private formBuilder: FormBuilder,
    private router: Router
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
    const phoneNumber = this.form.value.phonenumber;
    this.isLoaderVisible = true;
    this.otpService.sendOtp(phoneNumber).subscribe({
      next: (response) => {
        this.isLoaderVisible = false;
        this.otpSent = true;
        this.router.navigate(["/otpscreen", phoneNumber]);
      },
      error: (error) => {
        this.isLoaderVisible = false;
        console.log("Error sending OTP:", error);
        if (error.status == 0) {
          console.log("when server is of status code = ", error.status);
        }
      },
      complete: () => {
        this.isLoaderVisible = false;
      },
    });
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