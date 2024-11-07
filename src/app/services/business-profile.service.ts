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

  // BusinessDetails cannot be null so provided an empty object
  private emptyBusinessDetails: BusinessDetails = {
    name: '',
    username: '',
    profilePictureUrl: '',
    numberOfAdvertisements: '',
    followers: '',
    following: '',
    email: '',
    phoneNumber: '',
    facebookUrl: '',
    instagramUrl: ''
  };

  getBusinessDetails(username: string): Observable<BusinessDetails> {
    return this.http.get<BusinessDetails>(`https://dummyjson.com/c/2c5d-5b3e-4419-b5ee/${username}`, {
      responseType: 'json'
    })
    .pipe(
      catchError(error => {
        console.error('Error fetching business details', error);
        return of(this.emptyBusinessDetails);
      })
    );
  }

  getProfilePosts(username: string, page: number, postsPerPage: number): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`https://4720-2401-4900-1c44-5f73-e36c-cd1d-2ab9-c7ad.ngrok-free.app/feed-on-profile-page/posts-section/${username}?page=${page}&pageSize=${postsPerPage}`,{
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    })
      .pipe(
        catchError(error => {
          console.error('Error fetching profile posts', error);
          return of([]); // Return empty array on error
        })
      );
  }
  
  getSavedPosts(username: string, page: number, postsPerPage: number): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`https://4720-2401-4900-1c44-5f73-e36c-cd1d-2ab9-c7ad.ngrok-free.app/feed-on-profile-page/posts-section/${username}?page=${page}&pageSize=${postsPerPage}`,{
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      })
    })
      .pipe(
        catchError(error => {
          console.error('Error fetching saved posts', error);
          return of([]); // Return empty array on error
        })
      );
  }
  
}
