import { throwError } from 'rxjs';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BusinessDetails } from '../models/BusinessDetails';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class BusinessService {

  constructor(private http: HttpClient) { }

  // BusinessDetails cannot be null so provided an empty object
  // private emptyBusinessDetails: BusinessDetails = {
  //   name: '',
  //   username: '',
  //   profilePictureUrl: '',
  //   numberOfAdvertisements: '',
  //   followers: '',
  //   following: '',
  //   email: '',
  //   phoneNumber: '',
  //   facebookUrl: '',
  //   instagramUrl: ''
  // };

  getBusinessDetails(username: string): Observable<BusinessDetails> {
    return this.http.get<BusinessDetails>(`https://dummyjson.com/c/2c5d-5b3e-4419-b5ee/${username}`, {
      responseType: 'json'
    })
    .pipe(
      catchError(error => {
        console.error('Error fetching business details', error);
        return throwError(() => new Error('Failed to fetch User details'));
      })
    );
  }

  getProfilePosts(username: string, page: number, postsPerPage: number): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`http://192.168.1.7:8082/feed-on-profile-page/posts-section/${username}?page=${page}&pageSize=${postsPerPage}`,{
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),
    })
      .pipe(
        catchError(error => {
          console.error('Error fetching profile posts', error);
          return throwError(() => new Error('Failed to fetch profile posts'));
        })
      );
  }
  
  getSavedPosts(username: string, page: number, postsPerPage: number): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`http://192.168.1.7:8082/feed-on-profile-page/posts-section/${username}?page=${page}&pageSize=${postsPerPage}`,{
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      })
    })
      .pipe(
        catchError(error => {
          console.error('Error fetching saved posts', error);
          return throwError(() => new Error('Failed to fetch Saved posts'));
        })
      );
  }
  
}
