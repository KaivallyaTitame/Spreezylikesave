import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OtpService } from "src/app/otp.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { ErrorResponse } from 'src/app/models/error-response.model'; // Import the ErrorResponse interface
import { ErrorTypes } from 'src/app/models/error-types.enum'; // Import the ErrorTypes enum

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
      phonenumber: ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        this.validatePhoneNumber.bind(this)
      ]],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log("Form is invalid");
      return;
    }
    const phoneNumber = this.form.value.phonenumber;
    console.log("Form value:", phoneNumber);
    this.otpService.sendOtp(phoneNumber).subscribe(
      response => {
        console.log("OTP sent successfully", response);
        this.otpSent = true;
        this.router.navigate(['/otpscreen']); // Navigate to the OTP screen
      },
      (error: ErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  validatePhoneNumber(control: { value: string }): { invalidPhoneNumber: boolean } | null {
    const phoneNumberRegex = /^[0-9]{10}$/;
    const isValid = phoneNumberRegex.test(control.value);
    return isValid ? null : { invalidPhoneNumber: true };
  }

  private handleError(error: ErrorResponse): void {
    switch (error.errorCode) {
      case ErrorTypes.OTP_SEND_FAILED:
        console.error("Failed to send OTP:", error.errorDescription);
        break;
      case ErrorTypes.WAITING_TIME_LIMIT_EXCEEDED:
        console.error("Exceeded the waiting time limit for OTP verification:", error.errorDescription);
        break;
      case ErrorTypes.USER_NOT_FOUND:
        console.error("User not Registered attempting to login:", error.errorDescription);
        break;
      case ErrorTypes.OTP_NOT_FOUND:
        console.error("OTP not generated for current user:", error.errorDescription);
        break;
      default:
        console.error("An unknown error occurred:", error.errorDescription);
    }
  }
}
