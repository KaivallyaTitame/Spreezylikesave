import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Credentials } from "../models/credentials";
import { User } from "../models/user";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  registerNewUser(user: User) {
    this.registerToFirebase(user);
    this.persistUserData(user);
  }

  registerToFirebase(user: User) {
    let credentials = new Credentials();
    credentials.email = user.email;
    credentials.password = user.password;
    this.authService.registerWithCredentials(credentials);
  }

  persistUserData(user: User) {
    // this.http.post(environment.apiGateway+"/registerUser").pipe();
  }
}
