import { Injectable } from '@angular/core';
import { UserProfileDTO } from '../models/UserProfileDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessNavigationService {
  constructor(private http: HttpClient) { }

  is_AdFeed:boolean = true;
  is_Insights:boolean = false;
  is_Post:boolean = false;
  is_Notification:boolean = false;
  is_Profile:boolean = false;
  is_Search:boolean = false;

  getBusinessDetails(): Observable<UserProfileDTO[]> { 
    return this.http.get<UserProfileDTO[]>('https://dummyjson.com/c/98c2-5f66-47f6-9292', {
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    });
  }
}