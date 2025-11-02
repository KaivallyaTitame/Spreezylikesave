import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config';
import { BusinessInformation } from '../models/business-information';

@Injectable({
  providedIn: 'root'
})
export class BusinessNavigationService {
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  is_AdFeed:boolean = true;
  is_Insights:boolean = false;
  is_Post:boolean = false;
  is_Notification:boolean = false;
  is_Profile:boolean = false;
  is_Search:boolean = false;

  getBusinessDetails(username: string): Observable<BusinessInformation[]> { 
    return this.http.get<BusinessInformation[]>(API_CONFIG.SETTINGS.GET_BUSINESS_DETAILS(username), {
      responseType: 'json',
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}