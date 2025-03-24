import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BusinessDetails } from "../models/BusinessRegistration/BusinessDetails";
import { ConsumerDetails } from "../models/ConsumerRegistration/ConsumerDetails";
import { API_CONFIG } from "../api-config";

// Define response types for better type safety
interface RegistrationResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  registerNewUser(user: ConsumerDetails): Observable<RegistrationResponse> {
    return this.http
      .post(API_CONFIG.REGISTER_CONSUMER, user, { responseType: "json" })
      .pipe(
        map((response) => response as RegistrationResponse),
        catchError((error) => this.handleError(error))
      );
  }

  registerNewBusiness(user: BusinessDetails): Observable<RegistrationResponse> {
    return this.http
      .post(API_CONFIG.REGISTER_BUSINESS, user, { responseType: "json" })
      .pipe(
        map((response) => response as RegistrationResponse),
        catchError((error) => this.handleError(error))
      );
  }

  //error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "Registration failed. Please try again.";
    if (error.error) {
      try {
        const errorBody = JSON.parse(error.error);
        errorMessage = errorBody.errorDescription || errorMessage;
      } catch (e) {
        errorMessage = error.error || errorMessage;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}