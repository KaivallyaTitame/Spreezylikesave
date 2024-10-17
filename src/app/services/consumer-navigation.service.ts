import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDTO } from '../models/UserProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsumerNavigationService {
  constructor(private http:HttpClient) { }
  
  Is_AdFeed: boolean = false; 
  Is_Search: boolean = false;
  Is_Notification: boolean = false;
  Is_Profile: boolean = false;

  getConsumerDetails(): Observable<UserProfileDTO[]> {
    return this.http.get<UserProfileDTO[]> (`https://dummyjson.com/c/98c2-5f66-47f6-9292`,
      {
        responseType: 'json',
        headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    });
  }
}
