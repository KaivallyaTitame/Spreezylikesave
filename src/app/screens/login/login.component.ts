import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OtpService } from "src/app/otp.service";
import { AuthService } from "src/app/services/auth.service";

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
    private formBuilder: FormBuilder
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
      },
      error => {
        console.error("Error sending OTP", error);
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
}