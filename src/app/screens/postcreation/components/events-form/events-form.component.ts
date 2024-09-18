import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eventDetails } from 'src/app/models/event-details';
import { BackendService } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent {
  eventFormDetails: FormGroup;
  eventData: eventDetails = new eventDetails();
  username: string="nikhil123";
  imageFileNames: string[] = [];

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.eventFormDetails = this.fb.group({
      imageFileNames: [''],
      businessId:[''],
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
    this.backendService.generatedFileNames$.subscribe(fileNames => {
      this.imageFileNames = fileNames;
    });
  }

  handleSubmit() {
    if (this.eventFormDetails.valid) {
      this.createRequest(this.eventFormDetails);
      alert('Event details submitted successfully');
      this.eventFormDetails.reset();
    } else {
      alert('Please fill out the form correctly');
    }
  }

  createRequest(details: FormGroup) {
    this.eventData.imageFileNames = this.imageFileNames;
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
    console.log(this.eventData);
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
  
  processRequest(eventData: eventDetails) {
    console.log(eventData);
    const message=this.backendService.submitEventData(eventData);
    console.log(message);
  }
}
