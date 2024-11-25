import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AdvertisementDetails } from '../models/ad-details';
@Injectable({
  providedIn: 'root',
})
export class AdvertisementDetailsService {
  private baseUrl = 'https://dummyjson.com/c/c24e-729e-4ebc-a38f';

  constructor(private http: HttpClient) {}

  getAdvertisementDetailsById(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.get<AdvertisementDetails>(`${this.baseUrl}/c/e9c8-5ebd-4f70-a7b5/${advertisementId}`, {
      responseType: 'json',
      headers: new HttpHeaders(),
    });
  }

  getAdvertisementDetails(): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`${this.baseUrl}/c/e9c8-5ebd-4f70-a7b5`, {
      responseType: 'json',
      headers: new HttpHeaders(),
    });
  }

  updateLikes(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.post<AdvertisementDetails>(
      `${this.baseUrl}/content/advertisement/upvote/${advertisementId}`,
      {},
      {
        responseType: 'json',
        headers: new HttpHeaders(),
      }
    );
  }

  updateDislikes(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.post<AdvertisementDetails>(
      `${this.baseUrl}/content/advertisement/downvote/${advertisementId}`,
      {},
      {
        responseType: 'json',
        headers: new HttpHeaders(),
      }
    );
  }

  savePost(username: string, advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.post<AdvertisementDetails>(
      `${this.baseUrl}/content/advertisement/save`,
      {},
      {
        responseType: 'json',
        headers: new HttpHeaders({
          'X-Username': username,
          'X-Advertisement-ID': advertisementId.toString(),
        }),
      }
    );
  }

  calculateExpiry(expiryDate: string): { remainingDays: number; remainingHours: number; isExpired: boolean } {
    const expiry = new Date(expiryDate);
    const currentDate = new Date();
    const timeDiff = expiry.getTime() - currentDate.getTime();

    const remainingDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const remainingHours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));

    const isExpired = remainingDays < 0 || (remainingDays === 0 && remainingHours <= 0);

    return { remainingDays, remainingHours, isExpired };
  }
}
