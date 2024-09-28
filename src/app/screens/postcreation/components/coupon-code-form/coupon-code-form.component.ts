import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { couponDetails } from 'src/app/models/coupon-details';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { postUpload } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-coupon-code-form',
  templateUrl: './coupon-code-form.component.html',
  styleUrls: ['./coupon-code-form.component.css']
})
export class CouponCodeFormComponent {
  couponCodeFormDetails: FormGroup;
  couponCodeData: couponDetails = new couponDetails();
  imageFileNames: string[] = [];
  username:string="";
  businessId:string="";
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';

  constructor(private fb: FormBuilder, private postUpload: postUpload,private jwtDecoder : JwtDecoderService) {
    this.couponCodeFormDetails = this.fb.group({
      imageFileNames: [[], Validators.required],
      couponTitle: ['', Validators.required],
      username: ['', Validators.required],
      description: ['', Validators.required],
      promoBadge: ['', Validators.required],
      couponCode: ['', Validators.required],
      businessId: ['', Validators.required],
      termsAndConditions: ['', Validators.required],
      stepsToAvailOffer: ['', Validators.required],
      expiry: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    
    const token = localStorage.getItem('token');

    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];
    this.businessId = decodedInfo['sub'];
  
    this.couponCodeFormDetails.get('username')?.setValue(this.username);
    this.couponCodeFormDetails.get('businessId')?.setValue(this.businessId);

    
    this.postUpload.generatedFileNames$.subscribe(fileNames => {
      this.imageFileNames = fileNames;
      this.couponCodeFormDetails.get('imageFileNames')?.setValue(this.imageFileNames);
    });
  }

  handleSubmit() {
    if (this.couponCodeFormDetails.valid) {
      this.createRequest(this.couponCodeFormDetails);
    } else {
      alert('Please fill out the form correctly please');
    }
  }

  createRequest(details: FormGroup) {
    this.couponCodeData.imageFileNames =this.imageFileNames;
    this.couponCodeData.couponTitle = details.value['couponTitle'];
    this.couponCodeData.username = this.username;
    this.couponCodeData.description = details.value['description'];
    this.couponCodeData.promoBadge = details.value['promoBadge'];
    this.couponCodeData.couponCode = details.value['couponCode'];
    this.couponCodeData.businessId = this.businessId;
    this.couponCodeData.termsAndConditions = this.convertTextareaToListWithBulletPoints(details.value['termsAndConditions']);
    this.couponCodeData.stepsToAvailOffer = this.convertTextareaToListWithBulletPoints(details.value['stepsToAvailOffer']);
    
    this.couponCodeData.expiry = details.value['expiry'];

    this.processRequest(this.couponCodeData);
  }

  convertTextareaToListWithBulletPoints(textareaValue: string): string[] {
    return textareaValue
      .split('\n')
      .map(item => item.trim())  
      .filter(item => item.length > 0)
      .map(item => (item.startsWith('• ') ? item : `• ${item}`));
  }

  addBulletPointOnEnter(event: KeyboardEvent, textarea: HTMLTextAreaElement): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.slice(0, cursorPosition);
      const textAfterCursor = textarea.value.slice(cursorPosition);
      const updatedText = `${textBeforeCursor}\n• ${textAfterCursor}`;
      textarea.value = updatedText;
      textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
    }
  }

  addBulletPointOnFocus(textarea: HTMLTextAreaElement): void {
    if (!textarea.value.startsWith('•')) {
      textarea.value = `• ${textarea.value}`;
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  }

  processRequest(couponCodeData: couponDetails) {
    this.postUpload.submitCouponData(couponCodeData).subscribe({
      next: (response) => {
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
}
