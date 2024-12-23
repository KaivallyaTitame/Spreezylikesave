import { Injectable } from '@angular/core';
import { Observable, of, throwError, timeout, catchError } from 'rxjs';
import { UserProfileDTO } from '../models/UserProfileDTO';
import { API_CONFIG } from '../api-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConsumerNavigationService {
  constructor(private http: HttpClient) {}

  is_AdFeed: boolean = false;
  is_Search: boolean = false;
  is_Notification: boolean = false;
  is_Profile: boolean = false;

  getConsumerDetails(): Observable<UserProfileDTO[]> {
    const data = localStorage.getItem('consumerDetails');
    if (data) {

      const consumerDetails: UserProfileDTO[] = JSON.parse(data);
      return of(consumerDetails); 
    } else {
      return of([]);
    }
  }
  getUserDetails(username: string): Observable<UserProfileDTO> {
    return this.http.get<UserProfileDTO>(
      API_CONFIG.GET_BUSINESS_DETAILS(username),
      {
        responseType: 'json',
      }
    ).pipe(
      timeout(15000),
      catchError(error => {
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Request timed out while fetching user details.'));
        }
        return throwError(() => new Error('Failed to fetch user details.'));
      })
    );
  }
  private imageUrl = API_CONFIG.IMAGE_URL;getImageUrl(username: string, imageName: string): string {
    return `${this.imageUrl}/${username}/${imageName}`;
  }
}