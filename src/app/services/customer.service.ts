import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Credentials } from "../models/credentials";
import { BusinessDetails } from "../models/BusinessRegistration/BusinessDetails";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { ConsumerDetails } from "../models/ConsumerRegistration/ConsumerDetails";
@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  registerNewUser(user: ConsumerDetails) {
    console.log(user);
   
    return  this.http.post("https://localhost:8762/user/register-consumer", user)
    .subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error);
    });;
  }
  registerNewBusiness(user: BusinessDetails) {
    console.log(user);
    
    return this.http.post("https://localhost:8762/user/register-business", user)
    .subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error);
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




