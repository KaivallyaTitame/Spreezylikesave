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
    
})
export class OtpscreenComponent implements OnInit, OnDestroy {
  
  timer: number = 30;
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); 
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.intervalId); 
      }
    }, 1000); 
  }
  
}





