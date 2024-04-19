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
