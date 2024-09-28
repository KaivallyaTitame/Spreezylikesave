import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eventDetails } from 'src/app/models/event-details';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { postUpload } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent {
  eventFormDetails: FormGroup;
  eventData: eventDetails = new eventDetails();
  username: string = '';
  businessId: string = '';
  imageFileNames: string[] = [];
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';

  constructor(private fb: FormBuilder, private postUpload: postUpload,private jwtDecoder : JwtDecoderService) {
    this.eventFormDetails = this.fb.group({
      imageFileNames: [[], Validators.required],
      username: ['', Validators.required],
      businessId: ['', Validators.required],
      eventTitle: ['', Validators.required],
      description: ['', Validators.required],
      eventDateAndTime: ['', Validators.required],
      promoBadge: ['', Validators.required],
      expiry: ['', Validators.required],
      bookingUrl: ['', Validators.required],
      termsAndConditions: ['', Validators.required],
      stepsToAvailOffer: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];
    this.businessId = decodedInfo['sub'];
  
    this.eventFormDetails.get('username')?.setValue(this.username);
    this.eventFormDetails.get('businessId')?.setValue(this.businessId);

    
    this.postUpload.generatedFileNames$.subscribe(fileNames => {
      this.imageFileNames = fileNames;
      this.eventFormDetails.get('imageFileNames')?.setValue(this.imageFileNames);
    });
  }

  handleSubmit() {
    if (this.eventFormDetails.valid) {
      this.createRequest(this.eventFormDetails);
    } else {
      alert('Please fill out the form correctly');
    }
  }

  createRequest(details: FormGroup) {
    this.eventData.imageFileNames = this.imageurl;
    this.eventData.eventTitle = details.value['eventTitle'];
    this.eventData.description = details.value['description'];
    this.eventData.eventDateAndTime = details.value['eventDateAndTime'].toString();
    this.eventData.promoBadge = details.value['promoBadge'];
    this.eventData.expiry = details.value['expiry'].toString();
    this.eventData.bookingUrl = details.value['bookingUrl'];
    this.eventData.termsAndConditions = this.convertTextareaToListWithBulletPoints(details.value['termsAndConditions']);
    this.eventData.stepsToAvailOffer = this.convertTextareaToListWithBulletPoints(details.value['stepsToAvailOffer']);
    this.eventData.businessId=this.username;
    this.eventData.username=this.username;

    this.processRequest(this.eventData);
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

  processRequest(eventData: eventDetails) {
    console.log(eventData);
    this.postUpload.submitEventData(eventData).subscribe({
      next: (response) => {
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
}
