import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-ad-feed",
  templateUrl: "./ad-feed.component.html",
  styles: [],
})
export class AdFeedComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}