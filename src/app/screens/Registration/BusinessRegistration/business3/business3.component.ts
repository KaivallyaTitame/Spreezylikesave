
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUploadService } from 'src/app/services/post-upload.service';
import { BusinessData } from 'src/app/services/BusinessData.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-business3',
  templateUrl: './business3.component.html',
  styleUrls: ['./business3.component.css'],
})
export class Business3Component implements OnInit {
  form: FormGroup;
  aadharCardPhoto: File | null = null;
  panCardPhoto: File | null = null;

  // Popup state variables
  showPopUp: boolean = false;
  popupMessageTitle: string = '';
  popupMessageBody: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postUploadService: PostUploadService,
    private businessDataService: BusinessData,
    private customerService: CustomerService
  ) {
    this.form = this.fb.group({
      aadharCardPhoto: [null, Validators.required],
      panCardPhoto: [null, Validators.required],
      confirmPolicies: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {}

  handleFileUpload(event: Event, type: 'aadharCardPhoto' | 'panCardPhoto'): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0] || null;

    if (file) {
      if (!this.validateFile(file)) return;

      if (type === 'aadharCardPhoto') {
        this.aadharCardPhoto = file;
        this.form.patchValue({ aadharCardPhoto: file.name });
      } else if (type === 'panCardPhoto') {
        this.panCardPhoto = file;
        this.form.patchValue({ panCardPhoto: file.name });
      }
    }
  }

  validateFile(file: File): boolean {
    if (!file.type.startsWith('image/')) {
      this.showPopup('Invalid File', 'Invalid file type. Only images are allowed.');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.showPopup('File Too Large', 'File size exceeds the maximum allowed limit of 5MB.');
      return false;
    }
    return true;
  }

  triggerFileInput(id: string): void {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput?.click();
  }

  get aadharCardPhotoControl() {
    return this.form.get('aadharCardPhoto');
  }

  get panCardPhotoControl() {
    return this.form.get('panCardPhoto');
  }

  async registerUser(): Promise<void> {
    if (this.form.invalid || !this.aadharCardPhoto || !this.panCardPhoto) {
      this.showPopup('Invalid Form', 'Form is invalid or files are missing.');
      return;
    }

    this.showPopup('Processing', 'Uploading files and registering business. Please wait...');

    const businessDetails = this.businessDataService.getBusinessData();
    const fileNames = [this.aadharCardPhoto?.name || '', this.panCardPhoto?.name || ''];

    this.postUploadService.getPresignedUrl(fileNames, businessDetails.businessUsername).subscribe({
      next: async (presignedUrls) => {
        try {
          if (this.aadharCardPhoto && presignedUrls.presignedUrls[0]) {
            await this.postUploadService.uploadToS3(this.aadharCardPhoto, presignedUrls.presignedUrls[0]);
          }
          if (this.panCardPhoto && presignedUrls.presignedUrls[1]) {
            await this.postUploadService.uploadToS3(this.panCardPhoto, presignedUrls.presignedUrls[1]);
          }

          await this.customerService.registerNewBusiness(businessDetails);

          this.showPopup('Success', 'Business registration completed successfully!');
          this.router.navigate(['/login']);
        } catch (err: any) {
          this.showPopup('Error', err.message || 'An error occurred during the process.');
        }
      },
      error: (err: any) => { 
        const errorCode = err?.error?.errorCode || "Unknown Error";
        const errorDescription = err?.error?.errorDescription || "An unexpected error occurred.";
        this.showPopup(`Error (${errorCode})`, errorDescription);
      }
    });
  }

  get confirmPolicies(): FormControl {
    return this.form.get('confirmPolicies') as FormControl;
  }

  
  showPopup(title: string, body: string): void {
    this.popupMessageTitle = title;
    this.popupMessageBody = body;
    this.showPopUp = true;
  }

  handleClosePopUp(): void {
    this.showPopUp = false;
  }
}
