import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  panCardErrorMessage = '';

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
    });
  }

  ngOnInit(): void {}

  handleFileUpload(event: Event, type: 'aadharCardPhoto' | 'panCardPhoto'): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0] || null;

    if (file) {
      if (type === 'aadharCardPhoto') {
        this.aadharCardPhoto = file;
        this.form.patchValue({ aadharCardPhoto: file.name }); // Store the file name as a placeholder
      } else if (type === 'panCardPhoto') {
        this.panCardPhoto = file;
        this.form.patchValue({ panCardPhoto: file.name }); // Store the file name as a placeholder
      }
    }
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

  registerUser(): void {
    if (this.form.invalid || !this.aadharCardPhoto || !this.panCardPhoto) {
      console.error('Form is invalid or files are missing');
      return;
    }

    const businessDetails = this.businessDataService.getBusinessData();
    const fileNames = [
      this.aadharCardPhoto?.name || '',
      this.panCardPhoto?.name || '',
    ];

    console.log("Data being sent to DTO from Business3:", businessDetails); // Log data here
    console.log("File names being uploaded:", fileNames); // Log file names

    this.postUploadService.getPresignedUrl(fileNames, businessDetails.email).subscribe({
      next: (presignedUrls) => {
        if (this.aadharCardPhoto && presignedUrls.presignedUrls[0]) {
          this.postUploadService.uploadToS3(this.aadharCardPhoto, presignedUrls.presignedUrls[0]).subscribe();
        }
        if (this.panCardPhoto && presignedUrls.presignedUrls[1]) {
          this.postUploadService.uploadToS3(this.panCardPhoto, presignedUrls.presignedUrls[1]).subscribe();
        }

        this.customerService.registerNewBusiness(businessDetails);
        this.router.navigate(['/business-registration/success']);
      },
      error: (err) => {
        console.error('Error generating presigned URLs:', err);
      },
    });
  }
}

