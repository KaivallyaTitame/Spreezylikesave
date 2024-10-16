import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDto } from '../models/UserProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsumerNavigationService {
  constructor(private http:HttpClient) { }
  
  Is_AdFeed: boolean = false; 
  Is_Search: boolean = false;
  Is_Notification: boolean = false;
  Is_Profile: boolean = false;

  getUserDetails(): Observable<UserProfileDto[]> {
    return this.http.get<UserProfileDto[]> (`https://3d23-106-213-83-208.ngrok-free.app/Settings/consumer-details`,
      {
        responseType: 'json',
        headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    });
  }
}
