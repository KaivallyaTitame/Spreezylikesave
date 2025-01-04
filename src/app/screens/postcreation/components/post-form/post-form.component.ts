import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostDetails } from 'src/app/models/post-details';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { PostUploadService } from 'src/app/services/post-upload.service';
import { TextareaUtils } from 'src/app/shared/textarea-utils';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postFormDetails: FormGroup;
  postFormData: PostDetails = new PostDetails(); 
  username: string = '';
  businessId: string = '';
  imageFileNames: string[] = [];
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';
  imageFileNamesUpdated: boolean=false;

  constructor(private fb: FormBuilder, private postUpload: PostUploadService,private jwtDecoder: JwtDecoderService){
    this.postFormDetails = this.fb.group({
      imageFileNames: [[]],
      username: [''],
      postTitle: [''],
      description: [''],
      websiteLink: ['https://example.com'],
      expiry: [null],
      businessId: [''],
      promoBadge: ['',[Validators.maxLength(10)]],
      termsAndConditions: [''],
      stepsToAvailOffer: ['']
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];
    this.businessId = decodedInfo['sub'];
  
    this.postFormDetails.get('username')?.setValue(this.username);
    this.postFormDetails.get('businessId')?.setValue(this.businessId);

    
    this.postUpload.generatedFileNames$.subscribe(fileNames => {
      this.imageFileNames = fileNames;
      this.postFormDetails.get('imageFileNames')?.setValue(this.imageFileNames);
    });

    const websiteLinkInput = document.getElementById('websiteLink') as HTMLInputElement;

    // Ensure the input always starts with 'https://'
    websiteLinkInput.addEventListener('input', (event) => {
      const input = event.target as HTMLInputElement;

      // Prevent changes to the fixed prefix
      if (!input.value.startsWith('https://')) {
        input.value = 'https://' + input.value.replace(/^https?:\/\//, '');
      }
    });

    // Optional: Ensure cursor starts after the fixed part
    websiteLinkInput.addEventListener('focus', () => {
      setTimeout(() => {
        websiteLinkInput.setSelectionRange(8, websiteLinkInput.value.length);
      }, 0);
    });
  }

  handleSubmit() {
    if (this.postFormDetails.valid) {
      this.createRequest(this.postFormDetails);
      this.popUpTitle = 'Success!';
      this.popUpBody = 'Your post form has been submitted successfully.';
      this.showPopUp = true;
      this.postFormDetails.reset();
    } else {
      this.popUpTitle = 'Error!';
      this.popUpBody = 'Please fill out form correctly';
      this.showPopUp = true;
      this.postFormDetails.reset();
    }
  }

  createRequest(details: FormGroup) {
    this.postFormData.imageFileNames = this.postFormDetails.get('imageFileNames')?.value;
    this.postFormData.username = this.postFormDetails.get('username')?.value;
    this.postFormData.postTitle = details.value['postTitle'];
    this.postFormData.description = details.value['description'];
    this.postFormData.websiteLink=details.value['websiteLink'];
    this.postFormData.expiry = details.value['expiry'];
    this.postFormData.businessId = this.postFormDetails.get('businessId')?.value;
    this.postFormData.promoBadge = details.value['promoBadge'];
    this.postFormData.termsAndConditions = TextareaUtils.removeBulletPoints(details.value['termsAndConditions']?.trim() || '');
    this.postFormData.stepsToAvailOffer = TextareaUtils.removeBulletPoints(details.value['stepsToAvailOffer']?.trim() || '');
    this.processRequest(this.postFormData);
  }

  processRequest(postFormData: PostDetails) {
    this.postUpload.submitPostForm(postFormData).subscribe({
      next: (response) => {
        this.popUpTitle = 'Success!';
        this.popUpBody = 'Your post form has been submitted successfully.';
        this.showPopUp = true;
        this.postFormDetails.reset(); 
      },
      error: (error: HttpErrorResponse) => {
        this.popUpTitle = 'Error!';
        if (error.error && error.error.message) {
          this.popUpBody = `Error: ${error.error.message}`;
        } else {
          this.popUpBody = 'Something went wrong. Please try again.';
        }
        this.showPopUp = true;
      }
    });

  }

  onPopUpClose() {
    this.showPopUp = false; 
  }

  addBulletPointOnEnter(event: KeyboardEvent, textarea: HTMLTextAreaElement): void {
    TextareaUtils.addBulletPointOnEnter(event, textarea);
  }

  addBulletPointOnFocus(textarea: HTMLTextAreaElement): void {
    TextareaUtils.addBulletPointOnFocus(textarea);
  }

  resetForm(): void {
    this.postFormDetails.reset();
    this.imageFileNamesUpdated=true;
  }
}