import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { BusinessDetails } from "src/app/models/BusinessRegistration/BusinessDetails";
import { BusinessData } from "src/app/services/BusinessData.service";
import { CustomerService } from "src/app/services/customer.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-business1',
  templateUrl: './business1.component.html',
  styles: []
})
export class Business1Component {
  Business: BusinessDetails = new BusinessDetails();

  form: FormGroup = new FormGroup({
    ownerName: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(50)]), // Alphabets only, max length 50
    businessUsername: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_]+$/), // Alphanumeric and underscores
      Validators.minLength(3), // Minimum length of 3
      Validators.maxLength(20) // Maximum length of 20
    ]),
    businessName: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(50)]), // Alphanumeric, spaces allowed, max length 50
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) // Strict email format
    ]),
    phoneNumber: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/) // Numeric only, exactly 10 digits
    ]),
    gender: new FormControl("", [Validators.required]), // Must be selected
    businessType: new FormControl("", [Validators.required]), // Must be selected
  });

  constructor(private customerService: CustomerService, private dataService: BusinessData, private router: Router) {}

  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // Submit handler
  registerUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Trigger validation for all controls
      return;
    }

    const data = this.mapUserData(this.form);
    console.log("Data being sent to DTO from Business1:", data); // Log data here
    this.dataService.setBusinessData(data); // Push data to the shared array
    this.router.navigate(['/register/business/business2']);
  }

  // Map user data
  private mapUserData(form: FormGroup): BusinessDetails {
    this.Business.ownerName = form.get("ownerName")?.value;
    this.Business.businessName = form.get("businessName")?.value;
    this.Business.businessUsername = form.get("businessUsername")?.value;
    this.Business.email = form.get("email")?.value;
    this.Business.phoneNumber = form.get("phoneNumber")?.value;
    this.Business.gender = form.get("gender")?.value;
    this.Business.businessType = form.get("businessType")?.value;
    console.log("Mapped BusinessDetails in Business1:", this.Business); // Log mapped data
    return this.Business;
  }

  // Getters for form controls
  get name(): FormControl {
    return this.form.get("ownerName") as FormControl;
  }
  get businessName(): FormControl {
    return this.form.get("businessName") as FormControl;
  }
  get businessUsername(): FormControl {
    return this.form.get("businessUsername") as FormControl;
  }
  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }
  get phoneNumber(): FormControl {
    return this.form.get("phoneNumber") as FormControl;
  }
  get gender(): FormControl {
    return this.form.get("gender") as FormControl;
  }
  get businessType(): FormControl {
    return this.form.get("businessType") as FormControl;
  }
}
