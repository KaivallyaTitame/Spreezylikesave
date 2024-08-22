import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { OtpService } from 'src/app/services/otp.service';

export const otpScreenGuard: CanActivateFn = (route, state) => {
  const otpService = inject(OtpService);
  const router = inject(Router);
   
  if (otpService.isOtpSentToMobile) {
    return true; // Allow navigation to the OTP screen
  } else {
    alert('please enter mobile number first!')
    router.navigate(['/login']); // Redirect to the login route
    return true; // Block navigation to the OTP screen
  }
};
