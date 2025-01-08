import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { JwtDecoderService } from "../jwtDecoder/jwt-decoder.service";
import { environment } from "src/environments/environment.development";
import { API_CONFIG } from "src/app/api-config";

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
        this.router.navigate(["/homeCustomer"]);
        localStorage.setItem("token", JSON.stringify(response.user?.email));
      },
      (error) => {
        this.router.navigate(["/login"]);
        throw new Error(
          "Error occurred while logging in. Try again after sometime."
        );
      }
    );
  }

<<<<<<< HEAD
<<<<<<< HEAD
  private apiUrl = environment.apiGateway;

=======
>>>>>>> 885dbf4f27b3e4566896d5ecffe2c2c8c124a96d
=======
>>>>>>> 84b425a0ed7581ad99096295956e1fb49aa38ed1
  logout() {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoder.decodeInfoFromToken(token)["sub"] || "";
    return this.http
      .post(
<<<<<<< HEAD
<<<<<<< HEAD
        `${this.apiUrl}/auth/${userName}/logout`,
=======
        API_CONFIG.AUTH_LOGOUT(userName),
>>>>>>> 885dbf4f27b3e4566896d5ecffe2c2c8c124a96d
=======
        API_CONFIG.AUTH_LOGOUT(userName),
>>>>>>> 84b425a0ed7581ad99096295956e1fb49aa38ed1
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      .subscribe({
<<<<<<< HEAD
<<<<<<< HEAD
        next: (response) => {
=======
        next: () => {
>>>>>>> 885dbf4f27b3e4566896d5ecffe2c2c8c124a96d
=======
        next: () => {
>>>>>>> 84b425a0ed7581ad99096295956e1fb49aa38ed1
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
