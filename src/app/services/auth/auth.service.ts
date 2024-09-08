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

  // login(credentials: Credentials) {
  //   this.fireAuth
  //     .signInWithEmailAndPassword(credentials.email, credentials.password)
  //     .then((user) => {
  //       localStorage.setItem("token", credentials.email);
  //       this.router.navigate(["/home"]);
  //     })
  //     .catch((error) => {
  //       switch (error.code) {
  //         case "auth/too-many-requests": {
  //           throw new SpreezyError(
  //             SpreezyException.SPEX_2,
  //             "Multiple login attempts failed. Please try after sometime."
  //           );
  //         }
  //         case "auth/invalid-credentials": {
  //           throw new SpreezyError(
  //             SpreezyException.SPEX_1,
  //             "Validate username and password."
  //           );
  //         }
  //         default: {
  //           throw new SpreezyError(
  //             SpreezyException.SPEX_0,
  //             "Unknown error has occured. We will look into it. Please try again after sometime."
  //           );
  //         }
  //       }
  //     });
  // }

  // registerWithCredentials(credentials: Credentials) {
  //   this.fireAuth
  //     .createUserWithEmailAndPassword(credentials.email, credentials.password)
  //     .then(
  //       (user) => {
  //         this.alertService.sendAlertTrigger(
  //           new Alert(
  //             "Registration completed",
  //             "User has been successfully registered."
  //           )
  //         );
  //         this.router.navigate(["/login"]);
  //       },
  //       (error) => {
  //         throw new SpreezyError(
  //           SpreezyException.SPEX_3,
  //           "Error occured while registering you. Try again after sometime."
  //         );
  //       }
  //     );
  // }

  // logout2() {
  //   this.fireAuth.signOut().then(
  //     () => {
  //       localStorage.removeItem("token");
  //       this.router.navigate(["/login"]);
  //     },
  //     (error) => {
  //       this.router.navigate(["/login"]);
  //       throw new SpreezyError(
  //         SpreezyException.SPEX_5,
  //         "Error occured while logging out. Try again after sometime."
  //       );
  //     }
  //   );
  // }
  
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
    "http://localhost:8083/";

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
