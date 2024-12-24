// import { HttpClient } from "@angular/common/http";
// import { Component, Input } from "@angular/core";
// import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
// import { BusinessDetails } from "src/app/models/BusinessRegistration/BusinessDetails";
// import { kycDetails } from "src/app/models/BusinessRegistration/kycDetails";
// import { CustomerService } from "src/app/services/customer.service";
// import { OnInit } from "@angular/core";
// import { BusinessData } from "src/app/services/BusinessData.service";
// import { data } from "cypress/types/jquery";
// import { Router } from "@angular/router";


// interface StateData {
//   state: { name: string; cities: string[] }[];
// }

// @Component({
//   selector: "app-business2",
//   templateUrl: "./business2.component.html",
//   styleUrls: ["./business2.component.css"],
// })
// export class Business2Component implements OnInit {
//   Business: BusinessDetails = this.dataService.getBusinessData();

//   form: FormGroup;
//   stateData: StateData;

//   constructor(
//     //private customerService: CustomerService,
//     private http: HttpClient,
//     private dataService: BusinessData,
//     private router: Router
//   )
  
//   {
//     // Initialize the form group
//     console.log(" BusinessDetails " + this.Business);
//     this.form = new FormGroup({
//       aadharNumber: new FormControl("", [Validators.required, Validators.maxLength(12), this.numericValidator()]),
//       pancardNumber: new FormControl("", [Validators.required, Validators.maxLength(10)]),
//       state: new FormControl("", [Validators.required]),
//       city: new FormControl("", [Validators.required]),
//       pincode: new FormControl("", [Validators.required, Validators.maxLength(6), this.numericValidator()]),
//       bio: new FormControl("", [Validators.required, Validators.maxLength(80)]),
      
//     });
//     this.http.get<StateData>("assets/Statesandcities.json")
//       .subscribe((data) => {
//         this.stateData = data;
//       });
//   }
//   numericValidator(): ValidatorFn { return (control: AbstractControl): ValidationErrors | null => { const isValid = /^[0-9]*$/.test(control.value); return isValid ? null : { numeric: true }; }; }


//   ngOnInit(): void {

//     // this.Business = this.dataService.getBusinessData();
//     this.Business.businessName =
//       this.dataService.getBusinessData().businessName;
//     this.Business.businessUsername =
//       this.dataService.getBusinessData().businessUsername;
//     this.Business.phoneNumber = this.dataService.getBusinessData().phoneNumber;
//     this.Business.email = this.dataService.getBusinessData().email;
//     this.Business.gender = this.dataService.getBusinessData().gender;
    
    
//   }

//   // Function to get cities based on the selected state
//   getCitiesByState(selectedState: string): string[] {
//     const state = this.stateData.state.find(
//       (state) => state.name === selectedState
//     );
//     return state ? state.cities : [];
//   }

//   registerUser() {
//     if (this.form.invalid) {
//       return;
//     }

//     this.Business = this.mapUserData(this.form);
//     // this.customerService.registerNewBusiness(this.Business);
//     this.dataService.setBusinessData(this.Business);
//     this.router.navigate(["/Businessregistration/business3"]);
//   }

//   mapUserData(form: FormGroup): BusinessDetails {
//     this.Business.kycDetails = new kycDetails();
//     // Access and set properties of Business.kycDetails
//     this.Business.kycDetails.aadharNumber = form.get("aadharNumber")?.value;
//     this.Business.kycDetails.pancardNumber = form.get("pancardNumber")?.value;
//     this.Business.state = form.get("state")?.value;
//     this.Business.city = form.get("city")?.value;
//     this.Business.pincode = form.get("pincode")?.value;
//     this.Business.bio = form.get("bio")?.value;
//     return this.Business;
//   }

//   get aadharNumber(): FormControl {
//     return this.form.get("aadharNumber") as FormControl;
//   }
//   get pancardNumber(): FormControl {
//     return this.form.get("pancardNumber") as FormControl;
//   }
//   get state(): FormControl {
//     return this.form.get("state") as FormControl;
//   }
//   get city(): FormControl {
//     return this.form.get("city") as FormControl;
//   }
//   get pincode(): FormControl {
//     return this.form.get("pincode") as FormControl;
//   }
//   get bio(): FormControl {
//     return this.form.get("bio") as FormControl;
//   }
  
// }
import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
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
    // Initialize the form group
    this.form = new FormGroup({
      aadharNumber: new FormControl("", [Validators.required, Validators.maxLength(12), this.numericValidator()]),
      pancardNumber: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      state: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      pincode: new FormControl("", [Validators.required, Validators.maxLength(6), this.numericValidator()]),
      bio: new FormControl("", [Validators.required, Validators.maxLength(80)]),
    });

    // Load the states and cities JSON file
    this.http.get<StateData>("assets/Statesandcities.json")
      .subscribe((data) => {
        this.stateData = data;
      });
  }

  numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[0-9]*$/.test(control.value);
      return isValid ? null : { numeric: true };
    };
  }

  ngOnInit(): void {
    const businessData = this.dataService.getBusinessData();
    if (businessData) {
      this.Business = businessData;
      this.form.patchValue({
        aadharNumber: this.Business.kycDetails?.aadharNumber,
        pancardNumber: this.Business.kycDetails?.pancardNumber,
        state: this.Business.state,
        city: this.Business.city,
        pincode: this.Business.pincode,
        bio: this.Business.bio,
      });
    }
  }

  // Get cities based on the selected state
  getCitiesByState(selectedState: string): string[] {
    const state = this.stateData.state.find((state) => state.name === selectedState);
    return state ? state.cities : [];
  }

  navigate(){
    this.router.navigate(["/welcome/business1/business3"]);
  }
  registerUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.Business = this.mapUserData(this.form);
    this.dataService.setBusinessData(this.Business);
    this.router.navigate(["/Businessregistration/business3"]);
  }

  mapUserData(form: FormGroup): BusinessDetails {
    this.Business.kycDetails = new kycDetails();
    this.Business.kycDetails.aadharNumber = form.get("aadharNumber")?.value;
    this.Business.kycDetails.pancardNumber = form.get("pancardNumber")?.value;
    this.Business.state = form.get("state")?.value;
    this.Business.city = form.get("city")?.value;
    this.Business.pincode = form.get("pincode")?.value;
    this.Business.bio = form.get("bio")?.value;


    console.log("Form Data: ", form.value);
    console.log("Mapped BusinessDetails: ", this.Business);
    
    return this.Business;
  }

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
}
