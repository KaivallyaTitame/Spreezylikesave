import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DecodedToken } from "src/app/models/decodedToken";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
})
export class ProfileInfoComponent {
  @Input() name!: string;
  @Input() username!: string;
  @Input() imageUrl!: string;

  userType: string = "";
  defaultImageUrl = "assets/default-pic.png";
  constructor(private router: Router, private jwtDecoder: JwtDecoderService) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token") || "";
    if (token) {
      const decodedToken: DecodedToken =
        this.jwtDecoder.decodeInfoFromToken(token);
      this.userType = decodedToken["userType"];
    }
  }

  onProfileClick(username: string): void {
    console.log("Navigating to profile:", username);
    if (this.userType === "Consumer") {
      this.router.navigate([
        `/consumer-home/profile/business-profile/${username}`,
      ]);
    } else if (this.userType === "Business") {
      this.router.navigate([
        `/business-home/profile/business-profile/${username}`,
      ]);
    } else {
      console.error("Invalid user type:", this.userType);
    }
  }

  applyDefaultImageUrl(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultImageUrl;
  }
}
