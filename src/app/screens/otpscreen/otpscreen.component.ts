import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpService } from 'src/app/otp.service';  // Import the OtpService

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
  phoneNumber: string;  // Store the phone number

  constructor(
    private formBuilder: FormBuilder,
    private otpService: OtpService  // Inject the OtpService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.startTimer();
    this.phoneNumber = ''; // Initialize phoneNumber
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
      // For example, you can call the sendOtp method from the OtpService again
      this.otpService.sendOtp(this.phoneNumber).subscribe(
        response => {
          console.log('OTP resent successfully', response);
          this.timer = 30; // Restart the timer
          this.startTimer();
        },
        error => {
          console.error('Error resending OTP', error);
        }
      );
    }
  }

  onSubmit(): void {
    this.otpFormSubmitted = true;
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otpdigit;
      this.verifyOtp(this.phoneNumber, otp);  // Call the verifyOtp method
    } else {
      // Form is invalid, do nothing (error message will be displayed)
    }
  }

  verifyOtp(phoneNumber: string, otp: string): void {
    this.otpService.verifyOtp(phoneNumber, otp).subscribe(
      response => {
        console.log('OTP verified successfully', response);
        // Handle successful OTP verification, e.g., navigate to another page
      },
      error => {
        console.error('Error verifying OTP', error);
        // Handle OTP verification failure, e.g., display an error message
      }
    );
  }
}
