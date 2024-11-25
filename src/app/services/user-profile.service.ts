import { throwError, timeout, catchError, Observable } from 'rxjs';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private userUrl='https://dummyjson.com/c/2c5d-5b3e-4419-b5ee';
  private profilePostUrl='http://192.168.1.2:8082/feed-on-profile-page/posts-section';
  private savedPostUrl='http://192.168.1.2:8082/feed-on-profile-page/posts-section';

  constructor(private http: HttpClient) { }

  getUserDetails(username: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.userUrl}/${username}`, {
      responseType: 'json'
    })
    .pipe(
      timeout(15000),
      catchError(error => {
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Request timed out while fetching user details.'));
        }
        return throwError(() => new Error('Failed to fetch user details.'));
      })
    );
  }

  getProfilePosts(username: string, page: number, postsPerPage: number): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`${this.profilePostUrl}/${username}?page=${page}&pageSize=${postsPerPage}`,{
      responseType: 'json'
    })
      .pipe(
        timeout(15000),
        catchError(error => {
          if (error.name === 'TimeoutError') {
            return throwError(() => new Error('Request timed out while fetching profile posts.'));
          }
          return throwError(() => new Error('Failed to fetch profile posts.'));
        })
      );
  }
  getSavedPosts(username: string, page: number, postsPerPage: number): Observable<AdvertisementDetails[]> {
    return this.http.get<AdvertisementDetails[]>(`${this.savedPostUrl}/${username}?page=${page}&pageSize=${postsPerPage}`,{
      responseType: 'json'
    })
      .pipe(
        timeout(15000),
        catchError(error => {
          if (error.name === 'TimeoutError') {
            return throwError(() => new Error('Request timed out while fetching saved posts.'));
          }
          return throwError(() => new Error('Failed to fetch saved posts.'));
        })
      );
  }
}
