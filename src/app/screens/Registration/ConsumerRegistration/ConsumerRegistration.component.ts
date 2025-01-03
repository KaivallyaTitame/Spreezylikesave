import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { ConsumerDetails } from "src/app/models/ConsumerRegistration/ConsumerDetails";
import { Router } from "@angular/router";
import Swal from "sweetalert2"; 

@Component({
  selector: "app-register",
  templateUrl: "./ConsumerRegistration.component.html",
  styleUrls: []
})
export class ConsumerRegistration implements OnInit {
  public Consumer: ConsumerDetails = new ConsumerDetails();
  public form: FormGroup;

  constructor(private customerService: CustomerService, private router: Router) {}

  private numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^\d{10}$/.test(control.value);
      return isValid ? null : { numeric: true };
    };
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      username: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        this.numericValidator()
      ]),
      gender: new FormControl("", [Validators.required]),
      profilePicture: new FormControl("", [Validators.required]),
      confirmPolicies: new FormControl(false, [Validators.requiredTrue])
    });
  }

  public get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.registerUser();
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Form",
        text: "Please fill out all fields correctly."
      });
    }
  }

  private registerUser(): void {
    this.Consumer = this.mapUserData(this.form);

    // Call the service function and let the service handle the subscription and error
    this.customerService.registerNewUser(this.Consumer);

    // Optionally show a success message if desired before service response
    Swal.fire({
      icon: "info",
      title: "Success",
      text: "Successfully Regestered.",
      allowOutsideClick: true
    });
    this.router.navigate(['/login']);

  }

  private mapUserData(form: FormGroup): ConsumerDetails {
    return {
      name: form.get("name")?.value || "",
      username: form.get("username")?.value || "",
      email: form.get("email")?.value || "",
      phoneNumber: form.get("phoneNumber")?.value || "",
      gender: form.get("gender")?.value || "",
      profilePicture: form.get("profilePicture")?.value || ""
    } as ConsumerDetails;
  }

  public get name(): FormControl {
    return this.form.get("name") as FormControl;
  }

  public get email(): FormControl {
    return this.form.get("email") as FormControl;
  }

  public get username(): FormControl {
    return this.form.get("username") as FormControl;
  }

  public get phoneNumber(): FormControl {
    return this.form.get("phoneNumber") as FormControl;
  }

  public get gender(): FormControl {
    return this.form.get("gender") as FormControl;
  }

  public get profilePicture(): FormControl {
    return this.form.get("profilePicture") as FormControl;
  }

  public get confirmPolicies(): FormControl {
    return this.form.get("confirmPolicies") as FormControl;
  }
}
