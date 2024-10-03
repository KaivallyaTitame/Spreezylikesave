import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
=======
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OtpService } from 'src/app/services/otp/otp.service';
import { jwtDecode } from 'jwt-decode';
import { JwtDecoderService } from 'src/app/services/jwtDecoder/jwt-decoder.service';
import { DecodedToken } from 'src/app/models/decodedToken';
 // Import jwt_decode for decoding JWT tokens
>>>>>>> 421cafb (login functinality is working)

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
<<<<<<< HEAD
  
=======
  showPopUp: boolean = false;
  popupMessageTitle: string = '';
  popupMessageBody: string = '';

>>>>>>> da7be76 (used popup component where needed to show error responses)
  timer: number = 30;
  intervalId: any;
  disableResend: boolean = true;
  otpForm: FormGroup;
  otpFormSubmitted: boolean = false;
<<<<<<< HEAD

  constructor(private formBuilder: FormBuilder) { }
=======
  phoneNumber: string;
  resendOtpSuccess: boolean = false;
  resendOtpMessage: string = '';
  isLoaderVisible = false;
  resendCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private otpService: OtpService,
    private route: ActivatedRoute,
    private router: Router,
    private jwtDecoder : JwtDecoderService
  ) { }
>>>>>>> 421cafb (login functinality is working)

  ngOnInit(): void {
    this.createForm();
    this.startTimer();
<<<<<<< HEAD
=======
    this.route.paramMap.subscribe(params => {
      this.phoneNumber = params.get('mobileNumber') || "";
      console.log('Mobile Number:', this.phoneNumber);
    });
>>>>>>> 421cafb (login functinality is working)
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clear the interval when component is destroyed
  }

  createForm(): void {
    this.otpForm = this.formBuilder.group({
      otpdigit: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

<<<<<<< HEAD
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
=======
  handleTimer(): void {
    if (this.timer > 0) {
      this.timer--;
      this.disableResend = true;
      if (this.timer === 0) {
        clearInterval(this.intervalId);
        this.disableResend = false;
      }
    } else {
      this.disableResend = false;
      clearInterval(this.intervalId);
    }
  }

  startTimer(): void {
    this.intervalId = setInterval(() => this.handleTimer(), 1000);
>>>>>>> 421cafb (login functinality is working)
  }

  resendOTP(event: Event): void {
    if (this.resendCount >= 5) {
      alert('you reached max count of resent otp, please enter mobile and try agian ')
      this.router.navigate(['/login']);
      return;
    }

    if (this.disableResend) {
      event.preventDefault();
<<<<<<< HEAD
    } else {
      // Handle resend OTP logic here
=======
      return;
>>>>>>> 421cafb (login functinality is working)
    }

    this.isLoaderVisible = true;
    this.otpService.reSendOtp(this.phoneNumber).subscribe({
      next: (response) => {
        this.isLoaderVisible = false;
        this.resendCount++;
        console.log('OTP resent successfully', response);
        this.timer = 30;
        this.startTimer();
        this.resendOtpSuccess = true;
        this.resendOtpMessage = 'OTP resent successfully.';
        setTimeout(() => {
          this.resendOtpSuccess = false;
        }, 10000);
      },
      error: (error) => {
        this.isLoaderVisible = false;
        this.showPopup(`Error ${error.errorCode}`, ` ${error || 'Error occured while resending otp (Internal Server Error)'}  `)
        this.isLoaderVisible = false;
        console.error('Error resending OTP', error);
      }
    });
  }

  onSubmit(): void {
    this.otpFormSubmitted = true;
    if (this.otpForm.valid) {
<<<<<<< HEAD
      console.log("Form submitted successfully", this.otpForm.value);
    } else {
      // Form is invalid, do nothing (error message will be displayed)
    }
  }
=======
      const otp = this.otpForm.value.otpdigit;
      this.verifyOtp(this.phoneNumber, otp);
    }
  }

  verifyOtp(phoneNumber: string, otp: string): void {
    this.isLoaderVisible = true;
    this.otpService.verifyOtp(phoneNumber, otp).subscribe({
      next: (response) => {
        console.log('OTP verified successfully', response);
        const token = response.accessToken;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));

        const decodedInfoFromToken :DecodedToken = this.jwtDecoder.decodeInfoFromToken(token);
        const userType = decodedInfoFromToken['User Type'];
        console.log(decodedInfoFromToken)
        this.redirectBasedOnUserType(userType);
      },
      error: (error) => {
        this.isLoaderVisible = false;
        console.error('Error verifying OTP', error);
        this.showPopup(`Error ${error.error.errorCode} `, `${error.error.errorDescription || "Internal server error please try again later"} `)
      }
    });
  }

  redirectBasedOnUserType(userType: string): void {
    this.isLoaderVisible = false;
    switch (userType) {
      case 'Business':
        console.log('in business routing')
        this.router.navigate(['/homeBusiness']);
        break;
      case 'Admin':
        this.router.navigate(['/admin-route']);
        break;
      case 'Consumer':
        this.router.navigate(['/homeCustomer']);
        break;
      default:
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
        break;
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 421cafb (login functinality is working)
}
=======
}
>>>>>>> 31cb5cf (done changes as asked in pr)
=======

  showPopup(title : string, body : string){
    this.popupMessageTitle = title;
    this.popupMessageBody = body;
    this.showPopUp = true;
  }
  handleClosePopUp(){
    this.showPopUp = false;
  }
}
>>>>>>> da7be76 (used popup component where needed to show error responses)
