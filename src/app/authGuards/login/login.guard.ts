import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DecodedToken } from 'src/app/models/decodedToken';
import { JwtDecoderService } from 'src/app/services/jwtDecoder/jwt-decoder.service';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const token = localStorage.getItem('token');
  const router = inject(Router)

  function isTokenExpired(decodedToken: DecodedToken): boolean {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    return currentTime > decodedToken.exp;
  }

  const jwtDecoder = inject(JwtDecoderService)
  
  if(token){
    const decodedInfoFromToken :DecodedToken = jwtDecoder.decodeInfoFromToken(token);
        console.log(decodedInfoFromToken)
        if (isTokenExpired(decodedInfoFromToken)) {
          console.log("The token is expired.");
          localStorage.removeItem('token');
          return true;
        } 

        const userType = decodedInfoFromToken['User Type'];
        if(userType === 'Consumer') router.navigate(['homeCustomer'])
        else if(userType === 'Business') router.navigate(['homeBusiness'])
        else router.navigate(['homeCustomer'])
        return false;
  }

  return true;
};
