import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BusinessDetails } from "../models/BusinessRegistration/BusinessDetails";
import { ConsumerDetails } from "../models/ConsumerRegistration/ConsumerDetails";
import { API_CONFIG } from "../api-config";
import { RegistrationResponse } from "../models/registration-response";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  registerNewUser(user: ConsumerDetails): Observable<RegistrationResponse> {
    return this.http
      .post(API_CONFIG.REGISTRATION.CONSUMER, user, { responseType: "json" })
      .pipe(
        map((response) => response as RegistrationResponse),
        catchError((error) =>  {
          throw(error)
        })
      );
  }

  registerNewBusiness(user: BusinessDetails): Observable<RegistrationResponse> {
    return this.http
      .post(API_CONFIG.REGISTRATION.BUSINESS, user, { responseType: "json" })
      .pipe(
        map((response) => response as RegistrationResponse),
        catchError((error) => {
          throw(error)
        })
      );
  }
}