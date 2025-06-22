import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { OtpResponse } from "../../models/otpResponse";
import { VerifyOtpResponse } from "../../models/verifyOtpResponse";
import { API_CONFIG } from "src/app/api-config";

@Injectable({
  providedIn: "root",
})
export class OtpService {
  constructor(private http: HttpClient) {}
  isOtpSentToMobile = false;

  sendOtp(countrycode: string, mobile: string): Observable<OtpResponse> {
    return this.http
      .post<OtpResponse>(
        API_CONFIG.GENERATE_OTP,
        { phoneNumber: mobile, countryCode: countrycode },
        { responseType: "json" }
      )
      .pipe(
        tap(() => {
          this.isOtpSentToMobile = true;
        }),
        catchError((error) => {
          this.isOtpSentToMobile = false;
          throw(error); 
        })
      );
  }

  reSendOtp(countrycode: string, mobile: string): Observable<OtpResponse> {
    return this.http
      .post(
        API_CONFIG.RESEND_OTP,
        { phoneNumber: mobile, countryCode: countrycode },
        { responseType: "text" }
      )
      .pipe(
        map((response: string) => {
          console.log(response);
          return { success: true, message: response };
        }),
        catchError((error: HttpErrorResponse) => {
          throw(error);
        })
      );
  }

  verifyOtp(mobile: string, otp: string): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(API_CONFIG.VERIFY_OTP, {
      phoneNumber: mobile,
      otp: otp,
    });
  }
}