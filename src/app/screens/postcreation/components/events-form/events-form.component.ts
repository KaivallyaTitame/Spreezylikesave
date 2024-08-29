import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventForm } from 'src/app/models/event-form';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent {
  eventFormDetails:FormGroup;
  eventData:EventForm=new EventForm();
  imageurl:string="URL";

  constructor(private fb:FormBuilder,private backendService:BackendService){
    this.eventFormDetails=this.fb.group({
      images: [''],
      title: ['', Validators.required],
      eventDescription:['',Validators.required],
      eventDate:[null,Validators.required],
      eventStartTime:['',Validators.required],
      eventEndTime:['',Validators.required],
      promoBadge:['',Validators.required],
      expiryDate:[null,Validators.required],
      bookingUrl:['',Validators.required],
      termsConditions:['',Validators.required],
      steps:['',Validators.required]
    });
  }

  handleSubmit() {
    if (this.eventFormDetails.valid) {
      console.log(this.eventFormDetails.value);
      this.createRequest(this.eventFormDetails);
      alert('Event details submitted successfully');
      this.eventFormDetails.reset();
    } else {
      alert('Please fill out the form correctly');
    }
  }

  createRequest(details: FormGroup) {
    this.eventData.images=this.imageurl;
    this.eventData.title = details.value['title'];
    this.eventData.eventDescription = details.value['eventDescription'];
    this.eventData.eventDate = details.value['eventDate'];
    this.eventData.eventStartTime = details.value['eventStartTime'];
    this.eventData.eventEndTime = details.value['eventEndTime'];
    this.eventData.promoBadge = details.value['promoBadge'];
    this.eventData.expiryDate = details.value['expiryDate'];
    this.eventData.bookingUrl = details.value['bookingUrl'];
    this.eventData.termsConditions = details.value['termsConditions'];
    this.eventData.steps = details.value['steps'];
  
    this.processRequest(this.eventData);
  }
  

  processRequest(eventData: any) {
    const message = this.backendService.submitEventData(eventData);
  }
}
