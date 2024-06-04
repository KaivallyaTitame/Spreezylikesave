import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otpscreen',
<<<<<<< HEAD
  templateUrl: './otpscreen.component.html',
    // Ensure to include Tailwind CSS styles here if needed
=======
  templateUrl: './otpscreen.component.html',  
>>>>>>> b4f2286 (completed UI)
})
export class OtpscreenComponent implements OnInit, OnDestroy {
  
  timer: number = 30;
  intervalId: any;
  disableResend: boolean = true;
  otpForm: FormGroup;
  otpFormSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clear the interval when component is destroyed
  }

  createForm(): void {
    this.otpForm = this.formBuilder.group({
      otpdigit: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        if (this.timer === 30) {
          this.disableResend = true;
        } else if (this.timer === 0) {
          clearInterval(this.intervalId);
          this.disableResend = false;
        }
      } else {
        clearInterval(this.intervalId); // Stop the timer when it reaches 0
        // You can add additional actions here when the timer expires
      }
    }, 1000); // Update every second
  }

  resendOTP(event: Event): void {
    if (this.disableResend) {
      event.preventDefault();
    } else {
      // Handle resend OTP logic here
    }
  }

  onSubmit(): void {
    this.otpFormSubmitted = true;
    if (this.otpForm.valid) {
      console.log("Form submitted successfully", this.otpForm.value);
    } else {
      // Form is invalid, do nothing (error message will be displayed)
    }
  }
}
