import { Injectable } from '@angular/core';
import { UserProfileDTO } from '../models/UserProfileDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessNavigationServiceService {

  constructor() { }

  Is_AdFeed:boolean = true;
  Is_Insights:boolean = false;
  Is_Post:boolean = false;
  Is_Notification:boolean = false;
  Is_Profile:boolean = false;

  getBusinessDetails(): Observable<UserProfileDTO[]> { 
    return this.http.get<UserProfileDTO[]>('https://dummyjson.com/c/98c2-5f66-47f6-9292', {
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    });
  }
}