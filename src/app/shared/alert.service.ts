import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { Alert } from "../models/alert";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private alertTrigger = new ReplaySubject<Alert>(1);
  public alertTriggerReceiver = this.alertTrigger.asObservable();

  constructor() {}

  sendAlertTrigger(alert: Alert) {
    this.alertTrigger.next(alert);
  }

  receiveAlertTrigger(): Observable<Alert> {
    return this.alertTrigger.asObservable();
  }
}
