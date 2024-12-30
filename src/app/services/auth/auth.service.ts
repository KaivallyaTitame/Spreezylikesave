import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { JwtDecoderService } from "../jwtDecoder/jwt-decoder.service";
import { environment } from "src/environments/environment.development";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    private jwtDecoder: JwtDecoderService
  ) {}

  signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (response) => {
        console.log("response from goggle login: ", response);
        this.router.navigate(["/homeCustomer"]);
        localStorage.setItem("token", JSON.stringify(response.user?.email));
      },
      (error) => {
        console.log(error);
        this.router.navigate(["/login"]);
        throw new Error(
          "Error occurred while logging in. Try again after sometime."
        );
      }
    );
  }

  private apiUrl = environment.apiGateway;

  logout() {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoder.decodeInfoFromToken(token)["sub"] || "";
    return this.http
      .post(
        `${this.apiUrl}/auth/${userName}/logout`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      .subscribe({
        next: (response) => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.reload();
        },
        error: (error) => {
          throw new Error(`Error while logout : ${error}`);
        },
      });
  }
}
