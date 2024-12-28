import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessDetails } from '../models/BusinessDetails';
import { AdvertisementDetails } from '../models/ad-details';
import { API_CONFIG } from 'src/app/api-config';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private http: HttpClient) {}

  getBusinessDetails(username: string): Observable<BusinessDetails[]> {
    return this.http.get<BusinessDetails[]>(API_CONFIG.GET_BUSINESS_DETAILS(username), {
      responseType: 'json',
      headers: new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' }),
    });
  }

  getProfilePosts(username: string): Observable<AdvertisementDetails[]> {
    return this.http
      .get<{ advertisements: AdvertisementDetails[] }>(
        API_CONFIG.GET_PROFILE_POSTS(username),
        { responseType: 'json' }
      )
      .pipe(map(response => response.advertisements));
  }

  getSavedPosts(username: string): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(API_CONFIG.GET_SAVED_POSTS(username), {
      responseType: 'json',
      headers: new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' }),
    });
  }
}
