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
  showPopUp: boolean = false;
  popupMessageTitle: string = "";
  popupMessageBody: string = "";

  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    phonenumber: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
  });
  submitted = false;

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
}
