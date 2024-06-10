import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { SpreezyError, SpreezyException } from "../models/spreezyException";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {}

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
          "Error occurred while logging in. Try again after sometime."
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
