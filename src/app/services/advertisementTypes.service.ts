import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AdvertisementDetails } from '../models/ad-details';
import { JwtDecoderService } from './jwt-decoder.service';
@Injectable({
  providedIn: 'root',
})
export class AdvertisementDetailsService {
  private baseUrl = "http:/localhost:8082";
  private baseUrl2 = "http:/localhost:8762";

  constructor(private http: HttpClient , private jwtDecoderService : JwtDecoderService) {}

  getAdvertisementDetailsById(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.get<AdvertisementDetails>(`${this.baseUrl}/${advertisementId}`, {
      responseType: 'json',
      headers: new HttpHeaders(),
    });
  }

  getAdvertisementDetails(): Observable<AdvertisementDetails[]> {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    return this.http.get<AdvertisementDetails[]>(`http://localhost:8082/feed-on-profile-page/posts-section/${userName}?page=0&pageSize=10`, {
    // return this.http.get<AdvertisementDetails[]>(`https://dummyjson.com/c/9575-9fc6-48ff-a845`, {
      responseType: 'json',
      headers: new HttpHeaders(),
    });
  }

  updateLikes(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.post<AdvertisementDetails>(
      `http://localhost:8081/content/advertisement/upvote/${advertisementId}`,
      {},{
        responseType: 'json',
        headers: new HttpHeaders(),
      }
    );
  }

  updateDislikes(advertisementId: number): Observable<AdvertisementDetails> {
    return this.http.post<AdvertisementDetails>(
      `http://localhost:8081/content/advertisement/downvote/${advertisementId}`,
      {},{
        responseType: 'json',
        headers: new HttpHeaders(),
      }
    );
  }

  savePost(username: string, advertisementId: number): Observable<AdvertisementDetails> {
    console.log(username , advertisementId)
    return this.http.post<AdvertisementDetails>(
      `http://localhost:8081/content/advertisement/save`,
      {},{
        responseType: 'json',
        headers: new HttpHeaders({
          'username': username,
          'advertisementId': advertisementId,
        }),
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
