import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router, private http: HttpClient) {}

  signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (response) => {
        console.log('response from goggle login: ',response)
        this.router.navigate(["/homeCustomer"]);
        // localStorage.setItem("token", JSON.stringify(response.user?.email));
      },
      (error) => {
        console.log(error);
        this.router.navigate(["/login"]);
        throw new Error("Error occurred while logging in. Try again after sometime.")
      }
    );
  }

  private apiUrl =
    "https://dd02-2409-40c2-3e-e599-f900-2b15-56fa-b30b.ngrok-free.app/";

  logout(token: string, userName: string){
    return this.http.post(`${this.apiUrl}auth/${userName}/logout`, {}, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).subscribe({
      next: (response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        console.log("Came in resp of logout", response);
        window.location.reload();
      },
      error: (error) => {
        console.log("Error while logout", error);
      },
    });
  }
}
