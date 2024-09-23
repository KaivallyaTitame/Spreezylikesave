import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { postDetails } from 'src/app/models/post-details';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { postUpload } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  postFormDetails: FormGroup;
  postFormData: postDetails = new postDetails(); 
  username: string = 'nikhil123';
  businessId: string = 'nikhil2321';
  imageFileNames: string[] = [];

  constructor(private fb: FormBuilder, private postUpload: postUpload,private jwtDecoder : JwtDecoderService) {
    this.postFormDetails = this.fb.group({
      imageFileNames: [''],
      username: ['',Validators.required],
      postTitle: ['', Validators.required],
      description: ['', Validators.required],
      expiry: [null, Validators.required],
      businessId: [''],
      promoBadge: ['', Validators.required],
      termsAndConditions: ['', Validators.required],
      stepsToAvailOffer: ['', Validators.required]
    });
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

    this.postFormDetails.patchValue({
      username: this.username,
      businessId: this.businessId
    });

    
  }

  handleSubmit() {
    if (this.postFormDetails.valid) {
      this.createRequest(this.postFormDetails);
      alert('Post details submitted successfully');
      this.postFormDetails.reset();
    } else {
      alert('Please fill out the form correctly');
    }
  }

  createRequest(details: FormGroup) {
    this.postFormData.imageFileNames = this.imageurl;
    this.postFormData.username = details.value['username'];
    this.postFormData.postTitle = details.value['postTitle'];
    this.postFormData.description = details.value['description'];
    this.postFormData.expiry = details.value['expiry'];
    this.postFormData.businessId = details.value['businessId'];
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

  processRequest(postFormData: postDetails) {
    const message = this.postUpload.submitPostForm(postFormData);
  }

  
}
