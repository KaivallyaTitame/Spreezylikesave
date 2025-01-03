import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUploadService } from 'src/app/services/post-upload.service';
import { BusinessData } from 'src/app/services/BusinessData.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business3',
  templateUrl: './business3.component.html',
  styleUrls: ['./business3.component.css'],
})
export class Business3Component implements OnInit {
  form: FormGroup;
  aadharCardPhoto: File | null = null;
  panCardPhoto: File | null = null;

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
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Invalid file type. Only images are allowed.',
      });
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'File size exceeds the maximum allowed limit of 5MB.',
      });
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
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Form is invalid or files are missing.',
      });
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Processing',
      text: 'Uploading files and registering business. Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    const businessDetails = this.businessDataService.getBusinessData();
    const fileNames = [this.aadharCardPhoto?.name || '', this.panCardPhoto?.name || ''];

    this.postUploadService.getPresignedUrl(fileNames, businessDetails.businessUsername).subscribe({
      next: async (presignedUrls) => {
        try {
          // Upload files to S3
          if (this.aadharCardPhoto && presignedUrls.presignedUrls[0]) {
            await this.postUploadService.uploadToS3(this.aadharCardPhoto, presignedUrls.presignedUrls[0]);
          }
          if (this.panCardPhoto && presignedUrls.presignedUrls[1]) {
            await this.postUploadService.uploadToS3(this.panCardPhoto, presignedUrls.presignedUrls[1]);
          }

          // Register the business
          await this.customerService.registerNewBusiness(businessDetails);

          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Business registration completed successfully!',
          }).then(() => this.router.navigate(['/login']));
        } catch (err: any) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || 'An error occurred during the process.',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error while Uploading images',
          text: 'Please Try Again later!',
        });
      },
    });
  }

  get confirmPolicies(): FormControl {
    return this.form.get('confirmPolicies') as FormControl;
  }
}
