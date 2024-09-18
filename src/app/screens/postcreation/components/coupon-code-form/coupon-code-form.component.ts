import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { couponDetails } from 'src/app/models/coupon-details';
import { BackendService } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-coupon-code-form',
  templateUrl: './coupon-code-form.component.html',
  styleUrls: ['./coupon-code-form.component.css']
})
export class CouponCodeFormComponent {
  couponCodeFormDetails: FormGroup;
  couponCodeData: couponDetails = new couponDetails();
  imageFileNames: string[] = [];
  username:string="nikhil123";
  businessId:string="nikhil2321";

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.couponCodeFormDetails = this.fb.group({
      imageFileNames: [''],
      couponTitle: ['', Validators.required],
      username: [this.username, Validators.required],
      description: ['', Validators.required],
      promoBadge: ['', Validators.required],
      couponCode: ['', Validators.required],
      businessId: [this.businessId, Validators.required],
      termsAndConditions: ['', Validators.required],
      stepsToAvailOffer: ['', Validators.required],
      expiry: [null, Validators.required]
    });
    this.imageFileNames = this.backendService.getGeneratedFileNames();
  }

  ngOnInit(): void {
    this.backendService.generatedFileNames$.subscribe(fileNames => {
      this.imageFileNames = fileNames;
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
    console.log(couponCodeData);
    this.backendService.submitCouponData(couponCodeData);
  }
}
