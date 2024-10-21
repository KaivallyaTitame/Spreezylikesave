import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDto } from '../models/UserProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsumerNavigationService {
  constructor(private http:HttpClient) { }
  
  is_AdFeed: boolean = false; 
  is_Search: boolean = false;
  is_Notification: boolean = false;
  is_Profile: boolean = false;

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
