import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OtpService {
  private apiUrl = 'https://5e09-2405-201-2012-300d-f14e-5e7-16d-82d7.ngrok-free.app/';
  

  constructor(private http: HttpClient) {}

  sendOtp(mobile: string) {
    return this.http.post(`${this.apiUrl}auth/generate-otp`, {"phoneNumber":mobile});
  }

  verifyOtp(mobile: string, otp: string) {
    return this.http.post(`${this.apiUrl}auth/verify-otp`, { "phoneNumber" :1234567890,  "otp" :otp });
  }
}
