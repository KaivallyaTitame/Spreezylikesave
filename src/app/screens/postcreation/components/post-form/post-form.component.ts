import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { postDetails } from 'src/app/models/post-details';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { postUpload } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postFormDetails: FormGroup;
  postFormData: postDetails = new postDetails(); 
  username: string = '';
  businessId: string = '';
  imageFileNames: string[] = [];
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';

  constructor(private fb: FormBuilder, private postUpload: postUpload,private jwtDecoder: JwtDecoderService){
    this.postFormDetails = this.fb.group({
      imageFileNames: [[], Validators.required],
      username: ['', Validators.required],
      postTitle: ['', Validators.required],
      description: ['', Validators.required],
      expiry: [null, Validators.required],
      businessId: ['', Validators.required],
      promoBadge: ['', Validators.required],
      termsAndConditions: ['', Validators.required],
      stepsToAvailOffer: ['', Validators.required]
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
  }

  handleSubmit() {
    if (this.postFormDetails.valid) {
      this.createRequest(this.postFormDetails);
      this.popUpTitle = 'Success!';
      this.popUpBody = 'Your post form has been submitted successfully.';
      this.showPopUp = true;
      this.postFormDetails.reset();
    } else {
      alert('Please fill out the form correctly');
    }
  }

  createRequest(details: FormGroup) {
    this.postFormData.imageFileNames = this.postFormDetails.get('imageFileNames')?.value;
    this.postFormData.username = this.postFormDetails.get('username')?.value;
    this.postFormData.postTitle = details.value['postTitle'];
    this.postFormData.description = details.value['description'];
    this.postFormData.expiry = details.value['expiry'];
    this.postFormData.businessId = this.postFormDetails.get('businessId')?.value;
    this.postFormData.promoBadge = details.value['promoBadge'];
    this.postFormData.termsAndConditions = this.convertTextareaToListWithBulletPoints(details.value['termsAndConditions']);
    this.postFormData.stepsToAvailOffer = this.convertTextareaToListWithBulletPoints(details.value['stepsToAvailOffer']);
    this.processRequest(this.postFormData);
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

  processRequest(postFormData: postDetails) {
    console.log(postFormData);
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
}
