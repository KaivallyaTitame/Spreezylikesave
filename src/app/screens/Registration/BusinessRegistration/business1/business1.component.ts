import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { BusinessDetails } from "src/app/models/BusinessRegistration/BusinessDetails";
import { BusinessData } from "src/app/services/BusinessData.service";
import { CustomerService } from "src/app/services/customer.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-business1',
  templateUrl: './business1.component.html',
  styles: []
})
export class Business1Component {
  Business: BusinessDetails = new BusinessDetails();

  businessTypes: { id: number; name: string }[] = [];

  form: FormGroup = new FormGroup({
    ownerName: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(50)]),
    businessUsername: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_]+$/), 
      Validators.minLength(3), 
      Validators.maxLength(20) 
    ]),
    businessName: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(50)]), 
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) 
    ]),
    phoneNumber: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/) 
    ]),
    gender: new FormControl("", [Validators.required]), 
    businessType: new FormControl("", [Validators.required]), 
  });

  constructor(
    private customerService: CustomerService,
    private dataService: BusinessData,
    private router: Router,
    private http: HttpClient 
  ) {}

  
  ngOnInit(): void {
    this.loadBusinessTypes();
  }

  
  private loadBusinessTypes(): void {
    this.http.get<{ id: number; name: string }[]>('/assets/Businesstype.json')
      .subscribe(
        data => {
          this.businessTypes = data;
        },
        error => {
          console.error("Error loading business types:", error);
        }
      );
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

 
  registerUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
    }

    const data = this.mapUserData(this.form);
    console.log("Data being sent to DTO from Business1:", data); 
    this.dataService.setBusinessData(data); 
    this.router.navigate(['/register/business/business2']);
  }

 
  private mapUserData(form: FormGroup): BusinessDetails {
    this.Business.ownerName = form.get("ownerName")?.value;
    this.Business.businessName = form.get("businessName")?.value;
    this.Business.businessUsername = form.get("businessUsername")?.value;
    this.Business.email = form.get("email")?.value;
    this.Business.phoneNumber = form.get("phoneNumber")?.value;
    this.Business.gender = form.get("gender")?.value;
    this.Business.businessType = form.get("businessType")?.value;
    console.log("Mapped BusinessDetails in Business1:", this.Business); 
    return this.Business;
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
  get businessType(): FormControl {
    return this.form.get("businessType") as FormControl;
  }
  goBack(): void {
    this.router.navigate(['/register']);
  }
}
