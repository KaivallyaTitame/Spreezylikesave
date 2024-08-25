import { Component } from "@angular/core";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";
import { tap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private jwtDecode: JwtDecoderService
  ) {}

  logout() {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecode.decodeInfoFromToken(token).sub;
    console.log("Token:", token);
    console.log("Username:", userName);

    this.authService.logout(token, userName)
  }
}
