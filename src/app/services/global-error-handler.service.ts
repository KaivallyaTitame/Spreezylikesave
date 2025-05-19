import { HttpErrorResponse } from "@angular/common/http";
import { ApplicationRef, ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { Alert } from "../models/alert";
import { SpreezyError } from "../models/spreezyException";
import { AlertService } from "../shared/alert.service";
import { AppComponent } from "../app.component";
import { PopUpComponent } from "../components/pop-up/pop-up.component";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private alertService: AlertService, private zone: NgZone,private injector: Injector) {}

  handleError(error: any): void {
    if(error instanceof HttpErrorResponse){
          const errorB = JSON.parse(error?.error || {}); 
          const code = errorB.errorCode || '404';
          const message = errorB.errorDescription || 'An HTTP Error Occurred';
          const appRef = this.injector.get(ApplicationRef);
          const appComponent = appRef.components[0].instance as AppComponent;
          this.zone.run(() => {
            appComponent.showErrorPopup(code, message);
          })
    }
    else{
        console.error('Non-HTTP error:', error);
    }
  }
}
