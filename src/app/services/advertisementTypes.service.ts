import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AdvertisementDetails } from '../models/ad-details';
import { JwtDecoderService } from './jwt-decoder.service';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AdvertisementDetailsService {
  private baseUrl = "http:/localhost:8082";
  private baseUrl2 = "http:/localhost:8762";
  private token = localStorage.getItem("token") || "";
  constructor(private http: HttpClient , private jwtDecoderService : JwtDecoderService) {}

  getAdvertisementDetailsById(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.get<AdvertisementDetails>(`${this.baseUrl}/${advertisementId}`, {
      responseType: 'json',
      headers: new HttpHeaders(),
    });
  }

  getAdvertisementDetails(): Observable<AdvertisementDetails[]> {
    let userName = this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";
    return this.http.get<AdvertisementDetails[]>(`http://localhost:8082/feed-on-profile-page/posts-section/${userName}?page=0&pageSize=10`, {
    // return this.http.get<AdvertisementDetails[]>(`https://dummyjson.com/c/9575-9fc6-48ff-a845`, {
      responseType: 'json',
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }),
    });
  }

  updateLikes(advertisementId: number): Observable<HttpResponse<string>> {
    const userName = this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";
  
    return this.http.post(
      `http://localhost:8081/content/advertisement/upvote/${advertisementId}`,
      {},
      {
        headers: new HttpHeaders({
          username: userName,
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        }),
        observe: 'response' ,
        responseType: 'text' ,
      }
    );
  }

  updateDislikes(advertisementId: number): Observable<HttpResponse<string>> {
    const userName = this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";
  
    return this.http.post(
      `http://localhost:8081/content/advertisement/downvote/${advertisementId}`,
      {},
      {
        responseType: 'text', 
        observe: 'response',  
        headers: new HttpHeaders({
          username: userName,
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
  
  savePost(username: string, advertisementId: number): Observable<AdvertisementDetails> {
    const body = {
      username: username,
      advertisementId: advertisementId
    };

    return this.http.post<AdvertisementDetails>(
      'http://localhost:8081/content/advertisement/save',
      body, // send as body
      {
        responseType: 'json'
      }
    );
  }
  
  followUser(sourceUsername: string, username: string): Observable<any> {
    return this.http.post(
      `http://localhost:8081/user/follow/${sourceUsername}/${username}`,
      {},{
        responseType: 'json',
        headers: new HttpHeaders(),
      }
    );
  }

  reportPost(advertisementId: number): Observable<any> {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    return this.http.post(
      `http://localhost:8081/content/advertisement/report`,{
        "advertisementId": advertisementId,
        "usernameOfReporter": userName
      },{
        responseType: 'json',
        headers: new HttpHeaders(),
      }  );
    }

  unfollowUser(sourceUsername: string, username: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/user/unfollow/${sourceUsername}/${username}`,
      {},
      {
        responseType: 'json',
        headers: new HttpHeaders(),
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
