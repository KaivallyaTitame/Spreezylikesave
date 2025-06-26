import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { ConsumerDetails } from "src/app/models/ConsumerRegistration/ConsumerDetails";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-register",
  templateUrl: "./ConsumerRegistration.component.html",
  styleUrls: [],
})
export class ConsumerRegistration implements OnInit {
  public Consumer: ConsumerDetails = new ConsumerDetails();
  public form: FormGroup;

  showPopUp: boolean = false;
  popupMessageTitle: string = "";
  popupMessageBody: string = "";
  isLoading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  private numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^\d{10}$/.test(control.value);
      return isValid ? null : { numeric: true };
    };
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        this.numericValidator(),
      ]),
      gender: new FormControl("", [Validators.required]),
      profilePicture: new FormControl("abc"), // Optional field
      confirmPolicies: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  public onSubmit(): void {
    if (this.isFormValidWithoutProfilePicture()) {
      this.registerUser();
    } else {
      this.showPopup(
        "Invalid Form",
        "Please fill out all required fields correctly."
      );
    }
  }

  private isFormValidWithoutProfilePicture(): boolean {
    const { profilePicture, ...restControls } = this.form.controls;
    return Object.values(restControls).every((control) => control.valid);
  }
  private registerUser(): void {
    this.Consumer = this.mapUserData(this.form);

    this.showPopup(
      "Processing",
      "Your registration request is being processed."
    );
    this.isLoading = true;

    this.customerService.registerNewUser(this.Consumer).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        this.showPopup("Success", "Registration successful!");
      },
      error: (err: any) => {
        this.isLoading = false;
        throw (err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private mapUserData(form: FormGroup): ConsumerDetails {
    return {
      name: form.get("name")?.value || "",
      username: form.get("username")?.value || "",
      email: form.get("email")?.value || "",
      phoneNumber: form.get("phoneNumber")?.value || "",
      gender: form.get("gender")?.value || "",
      profilePicture: form.get("profilePicture")?.value || "abc",
    } as ConsumerDetails;
  }

  public showPopup(title: string, body: string): void {
    this.popupMessageTitle = title;
    this.popupMessageBody = body;
    this.showPopUp = true;
  }

  public handleClosePopUp(): void {
    this.showPopUp = false;
    this.router.navigate(["/login"]);
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
