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
    let errorMessage = "An unexpected error occurred";
    let errorName = "Error";

    if (error) {
      if (!(error instanceof HttpErrorResponse) && error.rejection) {
        error = error.rejection; // Get the real error object
      }

      // Safely access the error properties
      errorName = error?.name || errorName;
      errorMessage = error?.message || errorMessage;
    }

    this.zone.run(() => {
      this.alertService.sendAlertTrigger(new Alert(errorName, errorMessage));
    });

    // Optionally log the error to the console for further inspection
    console.error('Global Error Handler:', error);

    // Optionally log the error to the console for further inspection
    console.error('Global Error Handler:', error);
  }
}
