import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { OtpResponse } from "../../models/otpResponse";
import { VerifyOtpResponse } from "../../models/verifyOtpResponse";

@Injectable({
  providedIn: "root",
})
export class OtpService {
  private apiUrl =
    "https://dd02-2409-40c2-3e-e599-f900-2b15-56fa-b30b.ngrok-free.app/";

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
        tap((response) => {
          console.log(response);
          this.isOtpSentToMobile = true;
        }),
        catchError((error) => {
          console.error("Error sending OTP:", error);
          this.isOtpSentToMobile = false;
          return throwError(
            () => new Error("Failed to send OTP. Please try again later.")
          );
        })
      );
  }

  reSendOtp(countrycode: string, mobile: string): Observable<OtpResponse> {
    return this.http
      .post(
        `${this.apiUrl}auth/resend-otp`,
        { phoneNumber: mobile },
        { responseType: "text" }
      )
      .pipe(
        map((response: string) => {
          console.log(response);
          return { success: true, message: response };
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error in HTTP response:", error);

          let errorMessage = "Failed to send OTP. Please try again later.";
          if (error.error && typeof error.error === "string") {
            try {
              const errorBody = JSON.parse(error.error);
              if (errorBody.errorDescription) {
                errorMessage = errorBody.errorDescription;
              }
            } catch (e) {
              console.log("Error parsing error response body:", e);
            }
          }

          return throwError(() => new Error(errorMessage));
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
