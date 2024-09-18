import { Component } from "@angular/core";
import { Alert } from "src/app/models/alert";
import { AlertService } from "src/app/shared/alert.service";

@Component({
  selector: "app-alert-popup",
  templateUrl: "./alert-popup.component.html",
  styles: [],
})
export class AlertPopupComponent {
  title = "";
  message = "";
  isModelOpen: boolean = false;
  alert = new Alert("", "");

  constructor(private alertService: AlertService) {
    this.alertService.receiveAlertTrigger().subscribe({
      next: (alert) => {
        this.triggerAlert(alert);
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  triggerAlert(alert: Alert) {
    this.title = alert.title;
    this.message = alert.message;
    this.isModelOpen = true;
  }
}
