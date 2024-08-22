import { Component } from "@angular/core";
import { LogoutService } from "src/app/services/logout/logout.service";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent {
  constructor(
    private logoutService : LogoutService,
    private jwtDecode : JwtDecoderService
  ) {}

  logout(){
    let token = localStorage.getItem('token')|| ""  
    let userName  = this.jwtDecode.decodeInfoFromToken(token).sub;

    this.logoutService.logout(token, userName);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  }
}

