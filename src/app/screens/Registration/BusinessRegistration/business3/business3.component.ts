
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUploadService } from 'src/app/services/post-upload.service';
import { BusinessData } from 'src/app/services/BusinessData.service';
import { CustomerService } from 'src/app/services/customer.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-business3',
  templateUrl: './business3.component.html',
  styleUrls: ['./business3.component.css'],
})
export class Business3Component implements OnInit {
  form: FormGroup;
  aadharCardPhoto: File | null = null;
  panCardPhoto: File | null = null;
  aadharPreview: string | null = null;
  panPreview: string | null = null;
  showPopUp: boolean = false;
  popupMessageTitle: string = '';
  popupMessageBody: string = '';
  isSubmitting: boolean = false;

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

  async handleFileUpload(event: Event, type: 'aadharCardPhoto' | 'panCardPhoto'): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0] || null;

    if (file) {
      if (!this.validateFile(file)) {
        input.value = '';
        return;
      }

      // Create preview
      const preview = await this.createImagePreview(file);
      
      if (type === 'aadharCardPhoto') {
        this.aadharCardPhoto = file;
        this.aadharPreview = preview;
        this.form.patchValue({ aadharCardPhoto: file });
      } else {
        this.panCardPhoto = file;
        this.panPreview = preview;
        this.form.patchValue({ panCardPhoto: file });
      }
    }
  }

  private createImagePreview(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  validateFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      this.showPopup('Invalid File Type', 'Please upload only JPG, JPEG or PNG images');
      return false;
    }

    if (file.size > maxSize) {
      this.showPopup('File Too Large', 'File size should not exceed 5MB');
      return false;
    }

    return true;
  }

  triggerFileInput(type: 'aadharCardPhoto' | 'panCardPhoto'): void {
    const fileInput = document.getElementById(type) as HTMLInputElement;
    fileInput?.click();
  }

  get aadharCardPhotoControl() {
    return this.form.get('aadharCardPhoto');
  }

  get panCardPhotoControl() {
    return this.form.get('panCardPhoto');
  }

  get confirmPolicies(): FormControl {
    return this.form.get('confirmPolicies') as FormControl;
  }

  async registerUser(): Promise<void> {
    if (this.form.invalid || !this.aadharCardPhoto || !this.panCardPhoto) {
      this.showPopup('Incomplete Form', 'Please upload both documents and accept the terms');
      return;
    }

    this.isSubmitting = true;
    
    try {
      const businessDetails = this.businessDataService.getBusinessData();
      const fileNames = [this.aadharCardPhoto.name, this.panCardPhoto.name];

      // Get presigned URLs
      const presignedUrls = await firstValueFrom(
        this.postUploadService.getPresignedUrl(fileNames, businessDetails.businessUsername)
      );

      if (presignedUrls) {
        // Upload both files
        await Promise.all([
          firstValueFrom(this.postUploadService.uploadToS3(this.aadharCardPhoto, presignedUrls.presignedUrls[0])),
          firstValueFrom(this.postUploadService.uploadToS3(this.panCardPhoto, presignedUrls.presignedUrls[1]))
        ]);

        // Register new business
        await new Promise((resolve, reject) => {
          this.customerService.registerNewBusiness(businessDetails);
          resolve(true);
        });
        
        this.showPopup('Success', 'Documents uploaded and registration completed successfully!');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = 'An error occurred during registration';
      this.showPopup('Error', errorMessage);
    } finally {
      this.isSubmitting = false;
    }
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
