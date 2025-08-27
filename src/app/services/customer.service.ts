import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../api-config";
import { BusinessDetails } from "../models/BusinessRegistration/BusinessDetails";
import { ConsumerDetails } from "../models/ConsumerRegistration/ConsumerDetails";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  registerNewUser(user: ConsumerDetails) {
    console.log(user);
   
    return  this.http.post(API_CONFIG.REGISTRATION.CONSUMER, user ,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text'
      })
    })
  }
  registerNewBusiness(user: BusinessDetails) {
    console.log(user);
  
    return this.http.post(API_CONFIG.REGISTRATION.BUSINESS, user, { responseType: 'text' })
      .subscribe(response => {
        try {
          const parsedResponse = JSON.parse(response);
          console.log('Parsed Response:', parsedResponse);
        } catch (e) {
          console.log('Plain Text Response:', response);
        }
      }, error => {
        console.error('Error:', error);
        throw(error);
      });
  }
  
  
  // registerToFirebase(user: ConsumerDetails) {
  //   let credentials = new Credentials();
  //   credentials.email = user.email;
  //   this.authService.registerWithCredentials(credentials);
  // }
  persistUserData(user: ConsumerDetails) {
    // this.http.post(environment.apiGateway+"/registerUser").pipe();
  }
}




