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
    console.log(error instanceof HttpErrorResponse); 
    if(error instanceof HttpErrorResponse){
          console.log('Yes reached to this block !!'); 
          const appRef = this.injector.get(ApplicationRef);
          const appComponent = appRef.components[0].instance as AppComponent;
          const status_code = String(error?.status || '404'); 
          const message = error?.message || 'An HTTP error occurred.';
          this.zone.run(() => {
            appComponent.showErrorPopup(status_code, message);
          })
    }
    else{
        console.error('Non-HTTP error:', error);
    }
  }
}
