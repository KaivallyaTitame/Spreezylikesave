import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AdvertisementDetails } from '../models/ad-details';
import { JwtDecoderService } from './jwt-decoder.service';
import { HttpResponse } from '@angular/common/http';
import { API_CONFIG } from '../api-config';
@Injectable({
  providedIn: 'root',
})
export class AdvertisementDetailsService {
  private baseUrl = "http:/localhost:8082";
  private baseUrl2 = "http:/localhost:8762";
  private token = localStorage.getItem("token") || "";
  private userName = this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";

  constructor(private http: HttpClient , private jwtDecoderService : JwtDecoderService) {}

  getAdvertisementDetailsById(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.get<AdvertisementDetails>(`https://dummyjson.com/c/9575-9fc6-48ff-a845`, {
      responseType: 'json',
      headers: new HttpHeaders(),
    });
  }

  getAdvertisementDetails(): Observable<AdvertisementDetails[]> {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    return this.http.get<AdvertisementDetails[]>(API_CONFIG.ADVERTISEMENT_EVENTS.GET_ADVERTISEMENT_DETAILS(userName), {
    // return this.http.get<AdvertisementDetails[]>(`https://dummyjson.com/c/9575-9fc6-48ff-a845`, {
      responseType: 'json',
      headers: new HttpHeaders({
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('page', 0)
        .set('pageSize', 10)
    });
  }

  updateLikes(advertisementId: number): Observable<HttpResponse<string>> {
    const userName = this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";
  
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.UPVOTE_ADVERTISEMENT(advertisementId),
      {},{
        headers: new HttpHeaders({
          username: userName,
          authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        }),
        observe: 'response' ,
        responseType: 'text' ,
      }
    );
  }


  savePost(username: string, advertisementId: number): Observable<AdvertisementDetails> {

    return this.http.post<AdvertisementDetails>(
      API_CONFIG.ADVERTISEMENT_EVENTS.SAVE_ADVERTISEMENT,{
        username: username,
        advertisementId: advertisementId
      },{
        responseType: 'json'
      }
    );
  }

  updateDislikes(advertisementId: number): Observable<HttpResponse<string>> {
    const userName = this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";
  
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.DISLIKE_ADVERTISEMENT(advertisementId),
      {},{
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
  
  followUser(sourceUsername: string, username: string): Observable<any> {
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.FOLLOW(sourceUsername, username),
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
      API_CONFIG.ADVERTISEMENT_EVENTS.REPORT_ADVERTISEMENT,{
        "advertisementId": advertisementId,
        "usernameOfReporter": userName
      },{
        responseType: 'json',
        headers: new HttpHeaders(),
      }  );
    }

  unfollowUser(sourceUsername: string, username: string): Observable<any> {
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.UNFOLLOW(sourceUsername, username),
      {},{
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
