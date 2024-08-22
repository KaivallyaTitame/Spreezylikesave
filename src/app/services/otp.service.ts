import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { OtpResponse } from "../models/otpResponse";
import { VerifyOtpResponse } from "../models/verifyOtpResponse";

@Injectable({
  providedIn: "root",
})
export class OtpService {
  private apiUrl =
    "https://b5f6-2409-40c2-1041-30e2-2c85-2772-3041-ebee.ngrok-free.app/";

  constructor(private http: HttpClient) {}
  isOtpSentToMobile = false;
  sendOtp(mobile: string): Observable<OtpResponse> {
    return this.http
      .post<OtpResponse>(
        `${this.apiUrl}auth/generate-otp`,
        { phoneNumber: mobile },
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

  reSendOtp(mobile: string): Observable<OtpResponse> {
    return this.http
      .post(
        `${this.apiUrl}auth/resend-otp`,
        { phoneNumber: mobile },
        { responseType: "text" }
      )
      .pipe(
        map((response: string) => {
          if (response.includes("Otp Send Successfully")) {
            return { success: true, message: response };
          } else {
            return { success: false, message: response };
          }
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
    return this.http.post<VerifyOtpResponse>(`${this.apiUrl}auth/verify-otp`, {
      phoneNumber: mobile,
      otp: otp,
    });
  }
}
