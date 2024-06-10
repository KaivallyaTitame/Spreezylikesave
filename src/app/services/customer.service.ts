import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor() {}

  registerNewUser(user: User) {
    this.persistUserData(user);
  }

  persistUserData(user: User) {
    // Code to persist user data can be added here, if needed
  }
}
