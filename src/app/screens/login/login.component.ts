import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent {
  showPopUp: boolean = false;  // State to control popup visibility
  popupMessageTitle: string = '';  // Title for the popup
  popupMessageBody: string = '';   // Message body for the popup

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

  showPopup(title: string, message: string) {
    this.popupMessageTitle = title;
    this.popupMessageBody = message;
    this.showPopUp = true;
  }

  // Method to handle popup close
  handleClosePopUp() {
    this.showPopUp = false;
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  
}