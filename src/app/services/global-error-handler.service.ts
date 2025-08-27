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
         let errorAttribute:any; 
          if (typeof error?.error === 'object' && error?.error !== null) {
              errorAttribute = error.error; 
          } else if (typeof error?.error === 'string') {
             try {
                  errorAttribute = JSON.parse(error.error); 
              } catch (e) {
                  errorAttribute = {}; 
              }
          } else {
              errorAttribute = {}; 
          } 
          const errorCode = errorAttribute.errorCode || 'SPX-0-001';
          const errorMessage = errorAttribute.errorDescription || 'Service unavailable due to maintenance or technical issues';
          const appRef = this.injector.get(ApplicationRef);
          const appComponent = appRef.components[0].instance as AppComponent;
          this.zone.run(() => {
            appComponent.showErrorPopup(errorCode, errorMessage);
          })
    }
  }
}
