import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { BusinessDetails } from 'src/app/models/BusinessRegistration/BusinessDetails';
import { BusinessData } from 'src/app/services/BusinessData.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-business3',
  templateUrl: './business3.component.html',
  styleUrls: ['./business3.component.css']
})
export class Business3Component implements OnInit {
  Business: BusinessDetails = this.dataService.getBusinessData();
  form: FormGroup;
  aadharCardPhoto: File | null = null;
  panCardPhoto: File | null = null;
  aadharCardErrorMessage: string | null = null;
  panCardErrorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private dataService: BusinessData,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.form = this.fb.group({
      aadharCardPhoto: [null, Validators.required],
      panCardPhoto: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const businessData = this.dataService.getBusinessData();
    this.Business.kycDetails.aadharNumber = businessData.kycDetails.aadharNumber;
    this.Business.kycDetails.pancardNumber = businessData.kycDetails.pancardNumber;
    this.Business.state = businessData.state;
    this.Business.city = businessData.city;
    this.Business.bio = businessData.bio;
  }

  handleFileUpload(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]; // Safely access the first file

    if (!file) {
      console.error('No file selected');
      return;
    }

    if (controlName === 'aadharCardPhoto') {
      this.aadharCardPhoto = file;
      this.aadharCardErrorMessage = this.validateFile(file);
    } else if (controlName === 'panCardPhoto') {
      this.panCardPhoto = file;
      this.panCardErrorMessage = this.validateFile(file);
    }
    
    // Update the form with the selected file
    this.form.patchValue({ [controlName]: file });
  }

  validateFile(file: File | null): string | null {
    if (!file) {
      return 'Please select a file to upload.';
    }
    if (file.size > 1 * 1024 * 1024) { // Maximum file size limit of 1 MB
      return 'File size exceeds the maximum limit of 1 MB.';
    }
    return null;
  }

  registerUser() {
    if (this.form.valid && this.aadharCardPhoto && this.panCardPhoto) {
      const formData = new FormData();
      formData.append('aadharCardPhoto', this.aadharCardPhoto);
      formData.append('panCardPhoto', this.panCardPhoto);

      // Map form data to business details
      this.Business = this.mapUserData(this.form);

      // Call the service without subscribing here
      this.customerService.registerNewBusiness(this.Business);

      // Optionally reset the form after successful submission
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  mapUserData(form: FormGroup): BusinessDetails {
    this.Business.kycDetails.aadharImage = "placeholder_for_aadhar_image_url";
    this.Business.kycDetails.pancardImage = "placeholder_for_pancard_image_url";
    return this.Business;
  }

  triggerFileInput(fileInputId: string): void {
    const fileInputElement = this.document.getElementById(fileInputId) as HTMLInputElement;

    if (fileInputElement) {
      fileInputElement.click();
    }
  }

  get aadharCardPhotoControl(): FormControl {
    return this.form.get("aadharCardPhoto") as FormControl;
  }

  get panCardPhotoControl(): FormControl {
    return this.form.get("panCardPhoto") as FormControl;
  }
}
