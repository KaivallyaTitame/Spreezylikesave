import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OtpService {
  private apiUrl = environment.apiGateway;

  constructor(private http: HttpClient) {}

  sendOtp(mobile: string) {
    return this.http.post(`${this.apiUrl}/send-otp`, { mobile });
  }

  verifyOtp(mobile: string, otp: string) {
    return this.http.post(`${this.apiUrl}/verify-otp`, { mobile, otp });
  }
}
