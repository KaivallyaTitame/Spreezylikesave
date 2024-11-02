import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Alert } from "../models/alert";
import { SpreezyError } from "../models/spreezyException";
import { AlertService } from "../shared/alert.service";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private alertService: AlertService, private zone: NgZone) {}

  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    }
    this.zone.run(() => {
      this.alertService.sendAlertTrigger(new Alert(error.name, error.message));
    });
  }
}
