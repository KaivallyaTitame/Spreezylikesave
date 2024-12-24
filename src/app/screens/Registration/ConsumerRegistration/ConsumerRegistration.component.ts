
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { ConsumerDetails } from "src/app/models/ConsumerRegistration/ConsumerDetails";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: []
})
export class RegisterComponent implements OnInit {
  Consumer: ConsumerDetails = new ConsumerDetails();
  form: FormGroup;
  constructor(private customerService: CustomerService, private router: Router) {}
  numericValidator(): ValidatorFn { return (control: AbstractControl): ValidationErrors | null => { const isValid = /^[0-9]*$/.test(control.value); return isValid ? null : { numeric: true }; }; }
  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      username: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, Validators.maxLength(10), this.numericValidator()]),
      gender: new FormControl("", [Validators.required]),
      confirmPolicies: new FormControl(false, [Validators.requiredTrue]),
    });
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit() {
    if (this.form.valid) {
      this.registerUser();
    }
  }
  registerUser() {
    this.Consumer = this.mapUserData(this.form);
    this.customerService.registerNewUser(this.Consumer)
  }
  mapUserData(form: FormGroup): ConsumerDetails {
    return {
      name: form.get("name")?.value,
      email: form.get("email")?.value,
      username: form.get("username")?.value,
      phoneNumber: form.get("phoneNumber")?.value,
      gender: form.get("gender")?.value
    } as ConsumerDetails;
  }
  get name(): FormControl {
    return this.form.get("name") as FormControl;
  }
  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }
  get username(): FormControl {
    return this.form.get("username") as FormControl;
  }
  get phoneNumber(): FormControl {
    return this.form.get("phoneNumber") as FormControl;
  }
  get gender(): FormControl {
    return this.form.get("gender") as FormControl;
  }
  get confirmPolicies(): FormControl {
    return this.form.get("confirmPolicies") as FormControl;
  }
}