
import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
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
    ownerName: new FormControl("", [Validators.required]),
    businessUsername: new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
    ]),
    businessName: new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl("", [Validators.required, Validators.maxLength(10), this.numericValidator()]),
    gender: new FormControl("", [Validators.required]),
    confirmPolicies: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(private customerService: CustomerService, private dataService: BusinessData, private router: Router) {}
  numericValidator(): ValidatorFn { return (control: AbstractControl): ValidationErrors | null => { const isValid = /^[0-9]*$/.test(control.value); return isValid ? null : { numeric: true }; }; }

  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  registerUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Trigger validation for all controls
      return;
    }
  
    this.Business = this.mapUserData(this.form);
    this.dataService.setBusinessData(this.Business);
    this.router.navigate(['/Businessregistration/business2']);
  }
  


  private mapUserData(form: FormGroup): BusinessDetails {
    this.Business.ownerName = form.get("ownerName")?.value;
    this.Business.businessName = form.get("businessName")?.value;
    this.Business.businessUsername = form.get("businessUsername")?.value;
    this.Business.email = form.get("email")?.value;
    this.Business.phoneNumber = form.get("phoneNumber")?.value;
    this.Business.gender = form.get("gender")?.value;
  
    // Log the form data and mapped BusinessDetails
    console.log("Form Data: ", form.value);
    console.log("Mapped BusinessDetails: ", this.Business);
  
    return this.Business;
  }
  
navigate(){
  this.router.navigate(["/welcome/business1/business2"]);
}
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
  get confirmPolicies(): FormControl {
    return this.form.get("confirmPolicies") as FormControl;
  }
}
