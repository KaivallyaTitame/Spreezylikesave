import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponDetails } from 'src/app/models/coupon-details';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { PostUploadService } from 'src/app/services/post-upload.service';
import { TextareaUtils } from 'src/app/shared/textarea-utils';


@Component({
  selector: 'app-coupon-code-form',
  templateUrl: './coupon-code-form.component.html',
  styleUrls: ['./coupon-code-form.component.css']
})
export class CouponCodeFormComponent {
  couponCodeFormDetails: FormGroup;
  couponCodeData: CouponDetails = new CouponDetails();
  imageFileNames: string[] = [];
  username:string="";
  businessId:string="";
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';

  constructor(private fb: FormBuilder, private postUpload: PostUploadService,private jwtDecoder : JwtDecoderService) {
    this.couponCodeFormDetails = this.fb.group({
      imageFileNames: [[]],
      couponTitle: [''],
      username: [''],
      description: [''],
      promoBadge: [''],
      couponCode: [''],
      businessId: [''],
      websiteLink: [''],
      termsAndConditions: [''],
      stepsToAvailOffer: [''],
      expiry: [null]
    });
  }

  ngOnInit(): void {
    
    const token = localStorage.getItem('token');

    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];
    this.businessId = decodedInfo['sub'];
  
    this.couponCodeFormDetails.get('username')?.setValue(this.username);
    this.couponCodeFormDetails.get('businessId')?.setValue(this.businessId);

    
    this.postUpload.generatedFileNames$.subscribe((fileNames: string[]) => {
      this.imageFileNames = fileNames;
      this.couponCodeFormDetails.get('imageFileNames')?.setValue(this.imageFileNames);
    });
  }

  handleSubmit() {
    if (this.couponCodeFormDetails.valid) {
      this.createRequest(this.couponCodeFormDetails);
    } else {
      this.popUpTitle = 'Error!';
      this.popUpBody = 'Please fill out form correctly';
      this.showPopUp = true;
      this.couponCodeFormDetails.reset();
    }
  }

  createRequest(details: FormGroup) {
    this.couponCodeData.imageFileNames =this.imageFileNames;
    this.couponCodeData.couponTitle = details.value['couponTitle'];
    this.couponCodeData.username = this.username;
    this.couponCodeData.description = details.value['description'];
    this.couponCodeData.websiteLink = details.value['websiteLink'];
    this.couponCodeData.promoBadge = details.value['promoBadge'];
    this.couponCodeData.couponCode = details.value['couponCode'];
    this.couponCodeData.businessId = this.businessId;
    this.couponCodeData.termsAndConditions = TextareaUtils.convertTextareaToListWithBulletPoints(details.value['termsAndConditions']);
    this.couponCodeData.stepsToAvailOffer = TextareaUtils.convertTextareaToListWithBulletPoints(details.value['stepsToAvailOffer']);
    
    this.couponCodeData.expiry = details.value['expiry'];

    this.processRequest(this.couponCodeData);
  }

  processRequest(couponCodeData: CouponDetails) {
    this.postUpload.submitCouponData(couponCodeData).subscribe({
      next: () => {
        this.popUpTitle = 'Success!';
        this.popUpBody = 'Your coupon code form has been submitted successfully.';
        this.showPopUp = true;
        console.log(couponCodeData);
        this.couponCodeFormDetails.reset(); 
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
    this.couponCodeFormDetails.reset();
  }
}