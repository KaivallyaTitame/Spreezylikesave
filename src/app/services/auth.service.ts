import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { Alert } from "../models/alert";
import { Credentials } from "../models/credentials";
import { SpreezyError, SpreezyException } from "../models/spreezyException";
import { User } from "../models/user";
import { AlertService } from "../shared/alert.service";
import { CustomerService } from "./customer.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtDecoderService } from "./jwtDecoder/jwt-decoder.service";
import { API_CONFIG } from "../api-config";
import { Observable } from "rxjs";
import { VerifyOtpResponse } from "../models/verifyOtpResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  alert: Alert = new Alert("", "");

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient,
    private jwtDecoder: JwtDecoderService
  ) {}

  login(credentials: Credentials) {
    this.fireAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        localStorage.setItem("token", credentials.email);
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/too-many-requests": {
            throw new SpreezyError(
              SpreezyException.SPEX_2,
              "Multiple login attempts failed. Please try after sometime."
            );
          }
          case "auth/invalid-credentials": {
            throw new SpreezyError(
              SpreezyException.SPEX_1,
              "Validate username and password."
            );
          }
          default: {
            throw new SpreezyError(
              SpreezyException.SPEX_0,
              "Unknown error has occured. We will look into it. Please try again after sometime."
            );
          }
        }
      });
  }

  registerWithCredentials(credentials: Credentials) {
    this.fireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(
        (user) => {
          this.alertService.sendAlertTrigger(
            new Alert(
              "Registration completed",
              "User has been successfully registered."
            )
          );
          this.router.navigate(["/login"]);
        },
        (error) => {
          throw new SpreezyError(
            SpreezyException.SPEX_3,
            "Error occured while registering you. Try again after sometime."
          );
        }
      );
  }

  logout() {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoder.decodeInfoFromToken(token)["sub"] || "";
    return this.http
      .post(
        API_CONFIG.AUTH_LOGOUT(userName),
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      .subscribe({
        next: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.reload();
        },
        error: (error) => {
          throw new Error(`Error while logout : ${error}`);
        },
      });
  }
  
  logoutFromFireAuth() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
      },
      (error) => {
        this.router.navigate(["/login"]);
        throw new SpreezyError(
          SpreezyException.SPEX_5,
          "Error occured while logging out. Try again after sometime."
        );
      }
    );
  }

  signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (response) => {
        this.router.navigate(["/home"]);
        localStorage.setItem("token", JSON.stringify(response.user?.email));
      },
      (error) => {
        this.router.navigate(["/login"]);
        throw new SpreezyError(
          SpreezyException.SPEX_4,
          "Error occured while logging in. Try again after sometime."
        );
      }
    );
  }

  recycleTokenUsingRefreshToken(refreshToken: string): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(API_CONFIG.RECYCLE_TOKEN, {
      "refreshToken":refreshToken
    });
  }
}
