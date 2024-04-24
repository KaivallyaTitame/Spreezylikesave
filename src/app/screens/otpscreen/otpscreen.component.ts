import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-otpscreen',
  templateUrl: './otpscreen.component.html',
    // Ensure to include Tailwind CSS styles here if needed
})
export class OtpscreenComponent implements OnInit, OnDestroy {
  
  timer: number = 30;
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clear the interval when component is destroyed
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.intervalId); // Stop the timer when it reaches 0
        // You can add additional actions here when the timer expires
      }
    }, 1000); // Update every second
  }
  
}





