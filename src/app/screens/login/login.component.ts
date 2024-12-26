import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OtpService } from "src/app/services/otp/otp.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  showPopUp: boolean = false;
  popupMessageTitle: string = "";
  popupMessageBody: string = "";
  countryCodes: { value: string; label: string }[] = [];

  form: FormGroup;
  submitted: boolean = false;
  otpSent: boolean = false;

  constructor(
    private authService: AuthService,
    private otpService: OtpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      countryCode: ["+91", Validators.required],
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

  ngOnInit(): void {
    this.http
      .get<{ value: string; label: string }[]>("assets/country-codes.json")
      .subscribe((data) => {
        this.countryCodes = data;
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
    const selectedCountryCode = this.form.value.countryCode;
    this.isLoaderVisible = true;
    this.otpService.sendOtp(selectedCountryCode, phoneNumber).subscribe({
      next: (response) => {
        this.isLoaderVisible = false;
        this.otpSent = true;
        this.showPopup("Success", "OTP sent successfully.");
        this.router.navigate(["/otpscreen", phoneNumber, selectedCountryCode]);
      },
      error: (error) => {
        this.isLoaderVisible = false;
        const errorCode = error?.error?.errorCode || "Server is down";
        const errorDescription =
          error?.error?.errorDescription ||
          "Failed to send OTP. Please try again later (Internal server Error).";
        this.showPopup(`Error (${errorCode})`, errorDescription);
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

  showPopup(title: string, message: string) {
    this.popupMessageTitle = title;
    this.popupMessageBody = message;
    this.showPopUp = true;
  }

  handleClosePopUp() {
    this.showPopUp = false;
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  signup(){
    this.router.navigate(["/register"])
  }
}
