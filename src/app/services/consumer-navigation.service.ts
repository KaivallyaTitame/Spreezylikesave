import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDTO } from '../models/UserProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsumerNavigationService {
  constructor(private http:HttpClient) { }
  
  is_AdFeed: boolean = false; 
  is_Search: boolean = false;
  is_Notification: boolean = false;
  is_Profile: boolean = false;

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