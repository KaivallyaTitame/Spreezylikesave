import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDetails } from 'src/app/models/event-details';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { PostUploadService } from 'src/app/services/post-upload.service';
import { TextareaUtils } from 'src/app/shared/textarea-utils';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent {
  eventFormDetails: FormGroup;
  eventData: EventDetails = new EventDetails();
  username: string = '';
  businessId: string = '';
  imageFileNames: string[] = [];
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';

  constructor(private fb: FormBuilder, private postUpload: PostUploadService,private jwtDecoder : JwtDecoderService) {
    this.eventFormDetails = this.fb.group({
      imageFileNames: [[]],
      username: [''],
      businessId: [''],
      eventTitle: [''],
      description: [''],
      websiteLink: [''],
      eventDateAndTime: [''],
      promoBadge: [''],
      expiry: [''],
      bookingUrl: [''],
      termsAndConditions: [''],
      stepsToAvailOffer: [''],
    });
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];
    this.businessId = decodedInfo['sub'];
  
    this.eventFormDetails.get('username')?.setValue(this.username);
    this.eventFormDetails.get('businessId')?.setValue(this.businessId);

    
    this.postUpload.generatedFileNames$.subscribe((fileNames: string[]) => {
      this.imageFileNames = fileNames;
      this.eventFormDetails.get('imageFileNames')?.setValue(this.imageFileNames);
    });
  }

  handleSubmit() {
    if (this.eventFormDetails.valid) {
      this.createRequest(this.eventFormDetails);
    } else {
      this.popUpTitle = 'Error!';
      this.popUpBody = 'Please fill out form correctly';
      this.showPopUp = true;
      this.eventFormDetails.reset();
    }
  }

  createRequest(details: FormGroup) {
    this.eventData.imageFileNames = this.imageFileNames;
    this.eventData.eventTitle = details.value['eventTitle'];
    this.eventData.description = details.value['description'];
    this.eventData.eventDateAndTime = details.value['eventDateAndTime'].toString();
    this.eventData.promoBadge = details.value['promoBadge'];
    this.eventData.websiteLink=details.value['websiteLink'];
    this.eventData.expiry = details.value['expiry'].toString();
    this.eventData.bookingUrl = details.value['bookingUrl'];
    this.eventData.termsAndConditions = TextareaUtils.convertTextareaToListWithBulletPoints(details.value['termsAndConditions']);
    this.eventData.stepsToAvailOffer = TextareaUtils.convertTextareaToListWithBulletPoints(details.value['stepsToAvailOffer']);
    this.eventData.businessId=this.businessId;
    this.eventData.username=this.username;

    this.processRequest(this.eventData);
  }
  
  processRequest(eventData: EventDetails) {
    console.log(eventData);
    this.postUpload.submitEventData(eventData).subscribe({
      next: (response: any) => {
        this.popUpTitle = 'Success!';
        this.popUpBody = 'Your coupon code form has been submitted successfully.';
        this.showPopUp = true;
        console.log(eventData);
        this.eventFormDetails.reset(); 
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
    this.eventFormDetails.reset();
  }
}