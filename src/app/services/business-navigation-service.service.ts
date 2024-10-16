import { Injectable } from '@angular/core';
import { UserProfileDto } from '../models/UserProfileDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessNavigationServiceService {

  constructor() { }

  Is_AdFeed:boolean = true
  Is_Insights:boolean = false
  Is_Post:boolean = false;
  Is_Notification:boolean = false;
  Is_Profile:boolean = false;

  getBusinessDetails(): Observable<UserProfileDto[]> { 
    return this.http.get<UserProfileDto[]>('http://192.168.0.105:8762/user/profile/tanvi247', {
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    });
  }
}