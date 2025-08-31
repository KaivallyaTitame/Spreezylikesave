import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { BusinessDetails } from "src/app/models/BusinessRegistration/BusinessDetails";
import { kycDetails } from "src/app/models/BusinessRegistration/kycDetails";
import { CustomerService } from "src/app/services/customer.service";
import { OnInit } from "@angular/core";
import { BusinessData } from "src/app/services/BusinessData.service";
import { Router } from "@angular/router";

interface StateData {
  state: { name: string; cities: string[] }[];
}

@Component({
  selector: "app-business2",
  templateUrl: "./business2.component.html",
  styleUrls: ["./business2.component.css"],
})
export class Business2Component implements OnInit {
  Business: BusinessDetails = this.dataService.getBusinessData();

  form: FormGroup;
  stateData: StateData;

  constructor(
    private http: HttpClient,
    private dataService: BusinessData,
    private router: Router
  ) {
    this.form = new FormGroup({
      aadharNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        this.numericValidator(),
        this.aadharCardValidator(), // Add custom Aadhar card validator here
      ]),
      pancardNumber: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        this.pancardValidator(),
      ]),
      state: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      pincode: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        this.numericValidator(),
      ]),
      bio: new FormControl("", [Validators.required, Validators.maxLength(80)]),
    });

    this.http.get<StateData>("assets/Statesandcities.json").subscribe((data) => {
      this.stateData = data;
    });
  }

  ngOnInit(): void {
    this.Business = this.dataService.getBusinessData();
  }

  // Custom Validator for Aadhar Card
  aadharCardValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[2-9]{1}[0-9]{11}$/.test(control.value); // Ensures a valid 12-digit Aadhar starting with 2-9
      return isValid ? null : { aadharFormat: true };
    };
  }

  // Custom Validator for PAN Card
  pancardValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(control.value);
      return isValid ? null : { pancardFormat: true };
    };
  }

  // Custom Numeric Validator
  numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[0-9]*$/.test(control.value);
      return isValid ? null : { numeric: true };
    };
  }

  getCitiesByState(selectedState: string): string[] {
    const state = this.stateData.state.find(
      (state) => state.name === selectedState
    );
    return state ? state.cities : [];
  }

  registerUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Trigger validation for all controls
      return;
    }

    this.Business = this.mapUserData(this.form);
    console.log("Data being sent to DTO from Business2:", this.Business); // Log data here
    this.dataService.setBusinessData(this.Business);
    this.router.navigate(["/register/business/business3"]);
  }

  mapUserData(form: FormGroup): BusinessDetails {
    this.Business.kycDetails = new kycDetails();
    this.Business.kycDetails.aadharNumber = form.get("aadharNumber")?.value;
    this.Business.kycDetails.pancardNumber = form.get("pancardNumber")?.value;
    this.Business.state = form.get("state")?.value;
    this.Business.city = form.get("city")?.value;
    this.Business.pincode = form.get("pincode")?.value;
    this.Business.bio = form.get("bio")?.value;

    console.log("Mapped BusinessDetails in Business2:", this.Business); // Log mapped data
    return this.Business;
  }

  // Getter methods for easy access to form controls
  get aadharNumber(): FormControl {
    return this.form.get("aadharNumber") as FormControl;
  }
  get pancardNumber(): FormControl {
    return this.form.get("pancardNumber") as FormControl;
  }
  get state(): FormControl {
    return this.form.get("state") as FormControl;
  }
  get city(): FormControl {
    return this.form.get("city") as FormControl;
  }
  get pincode(): FormControl {
    return this.form.get("pincode") as FormControl;
  }
  get bio(): FormControl {
    return this.form.get("bio") as FormControl;
  }
  goBack(): void {
    this.router.navigate(["/register/business/business1"]);
  }
}
