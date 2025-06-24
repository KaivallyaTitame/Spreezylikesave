import { Component, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FeedbackRequest } from 'src/app/models/feedbackrequest';
import { FeedbackResponse } from 'src/app/models/feedback-response';

@Component({
  selector: 'app-feedback-screen',
  templateUrl: './feedback-screen.component.html',
  styleUrls: ['./feedback-screen.component.css']
})
export class FeedbackScreenComponent {
  @Output() submitFeedback = new EventEmitter<void>();

  faStar = faStar;
  rating = 0;
  submitted = false;
  showPopUp = false;
  popUpTitle = '';
  popUpBody = '';
  feedbackrequest: FeedbackRequest = new FeedbackRequest();

  ratingTexts: { [key: number]: string } = {
    1: 'Worst',
    2: 'Bad',
    3: 'Okay',
    4: 'Good',
    5: 'Excellent'
  };

  feedbackForm: FormGroup = new FormGroup({
    satisfaction: new FormControl('', [Validators.required, this.atLeastOneStar.bind(this)]),
    feedback: new FormControl('', [Validators.maxLength(150)]),
    featureRequest: new FormControl('', [Validators.maxLength(200)])
  });

  constructor(private feedbackservice: FeedbackService) {}

  setRating(value: number) {
    this.rating = value;
    this.feedbackForm.get('satisfaction')?.setValue(value);  
    this.feedbackForm.get('satisfaction')?.markAsTouched();
  }

  feedbackmethod() {
    this.submitted = true;

    if (this.feedbackForm.valid && this.rating > 0) {
      this.feedbackrequest.rating = this.ratingTexts[this.rating];
      this.feedbackrequest.feedbackDescription = this.feedbackForm.get('feedback')?.value;
      this.feedbackrequest.featureRequestDescription = this.feedbackForm.get('featureRequest')?.value;

      this.feedbackservice.feedback(
        this.feedbackrequest,
        (response: FeedbackResponse) => {
          this.popUpTitle = 'Thank You for Your Feedback!!';
          this.popUpBody = 'We appreciate your input and will use it to improve our services.';
          this.showPopUp = true;
        },
        (error) => {
          console.log(error);
          throw(error); 
        }
      );
    } else {
      this.popUpTitle = 'Error SPX-4-001';
      this.popUpBody = 'Please ensure all fields are correctly filled out.';
      this.showPopUp = true;
    }
  }

  atLeastOneStar(control: FormControl): { [key: string]: boolean } | null {
    const rating = control.value;
    return rating === null || rating === 0 ? { 'noStars': true } : null;
  }

  closePopUp() {
    this.showPopUp = false;
  }
}
