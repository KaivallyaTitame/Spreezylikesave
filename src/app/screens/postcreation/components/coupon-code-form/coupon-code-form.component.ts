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

  constructor(private fb: FormBuilder, private postUpload: postUpload,private jwtDecoder : JwtDecoderService) {
    this.couponCodeFormDetails = this.fb.group({
      imageFileNames: [''],
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
    this.imageFileNames = this.postUpload.getGeneratedFileNames();
  }

  ngOnInit(): void {

    this.postUpload.generatedFileNames$.subscribe(fileNames => {
      this.imageFileNames = fileNames;
    });
    
    const token = localStorage.getItem('token');
    if (token) {
      const decodedInfo = this.jwtDecoder.decodeInfoFromToken(token);
      this.username = decodedInfo['sub']; 
      this.businessId = decodedInfo['sub']; 
    }

    this.couponCodeFormDetails.patchValue({
      username: this.username,
      businessId: this.businessId
    });
  }

  handleSubmit() {
    if (this.couponCodeFormDetails.valid) {
      this.createRequest(this.couponCodeFormDetails);
      this.couponCodeFormDetails.reset();
    } else {
      alert('Please fill out the form correctly');
    }
  }

  createRequest(details: FormGroup) {
    this.couponCodeData.imageFileNames = this.imageurl;
    this.couponCodeData.couponTitle = details.value['couponTitle'];
    this.couponCodeData.username = details.value['username'];
    this.couponCodeData.description = details.value['description'];
    this.couponCodeData.promoBadge = details.value['promoBadge'];
    this.couponCodeData.couponCode = details.value['couponCode'];
    this.couponCodeData.businessId = details.value['businessId'];
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

  processRequest(couponCodeData: couponDetails) {
    console.log(couponCodeData);
    this.postUpload.submitCouponData(couponCodeData);
  }
}
