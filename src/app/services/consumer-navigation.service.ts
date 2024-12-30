import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfileDTO } from '../models/UserProfileDTO';

@Injectable({
  providedIn: 'root',
})
export class ConsumerNavigationService {
  constructor(private http: HttpClient) {};
  token = localStorage.getItem('token');

  is_AdFeed: boolean = false;
  is_Search: boolean = false;
  is_Notification: boolean = false;
  is_Profile: boolean = false;

  getUserDetails(username: string): Observable<any> {
    return this.http.get(API_CONFIG.SETTINGS.GET_CONSUMER_DETAILS(username), {
      responseType: 'text',
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        accept: 'application/json',
      }),
    });
  }

  private imageUrl = API_CONFIG.IMAGE_URL;getImageUrl(username: string, imageName: string): string {
    return `${this.imageUrl}/${username}/${imageName}`;
  }
}