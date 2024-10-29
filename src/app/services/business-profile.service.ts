import { AdvertisementDetails } from 'src/app/models/ad-details';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BusinessDetails } from '../models/BusinessDetails';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }


  getBusinessDetails(username: string): Observable<BusinessDetails[]> {
    return this.http.get<BusinessDetails[]>(`https://dummyjson.com/c/2c5d-5b3e-4419-b5ee/${username}`, {
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    })
    .pipe(
      catchError(error => {
        console.error('Error fetching business details', error);
        return of([]); // return an empty array or handle the error as needed
      })
    );
  }

  getProfilePosts(username: string): Observable<AdvertisementDetails[]> {
    return this.http.get<{ advertisements: AdvertisementDetails[] }>(`https://dummyjson.com/c/8fc4-305d-41a6-9f57/${username}`, {
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    }).pipe(
      map(response => response.advertisements),
      catchError(error => {
        console.error('Error fetching profile posts', error);
        return of([]); // return an empty array in case of error
      })
    );
  }

  getSavedPosts(username: string): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`https://dummyjson.com/c/7a77-80db-45c1-baf0/${username}`, {
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    }).pipe(
      catchError(error => {
        console.error('Error fetching saved posts', error);
        return of([]); // handle error by returning an empty array
      })
    );
  }
}
