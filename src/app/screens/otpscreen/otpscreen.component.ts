import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otpscreen',
  templateUrl: './otpscreen.component.html',  
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
    clearInterval(this.intervalId); 
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
        clearInterval(this.intervalId); 
      }
    }, 1000); 
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
