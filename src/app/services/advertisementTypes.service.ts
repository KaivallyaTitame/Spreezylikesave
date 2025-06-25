import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../api-config";
import { AdvertisementDetails } from "../models/ad-details";
import { JwtDecoderService } from "./jwtDecoder/jwt-decoder.service";

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

@Injectable({
  providedIn: "root",
})
export class AdvertisementDetailsService {
  private token = localStorage.getItem("token") || "";

  constructor(
    private http: HttpClient,
    private jwtDecoderService: JwtDecoderService
  ) {}

  getAdvertisementDetails(page: number = 0, pageSize: number = 10): Observable<AdvertisementDetails[]> {
    const token = localStorage.getItem("token") || "";
    const userName =
      this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const url =
      API_CONFIG.ADVERTISEMENT_EVENTS.GET_ADVERTISEMENT_DETAILS(userName);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    const params = new HttpParams()
      .set("page", page.toString())
      .set("pageSize", pageSize.toString());
    
    return this.http.request<AdvertisementDetails[]>("GET", url, {
      headers,
      params,
      responseType: "json",
    });
  }

  getAdvertisementDetailsPaginated(page: number = 0, pageSize: number = 10): Observable<PaginatedResponse<AdvertisementDetails>> {
    const token = localStorage.getItem("token") || "";
    const userName =
      this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const url =
      API_CONFIG.ADVERTISEMENT_EVENTS.GET_ADVERTISEMENT_DETAILS(userName);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    const params = new HttpParams()
      .set("page", page.toString())
      .set("pageSize", pageSize.toString());
    
    return this.http.request<PaginatedResponse<AdvertisementDetails>>("GET", url, {
      headers,
      params,
      responseType: "json",
    });
  }

  getFreshAdvertisements(pageSize: number = 10): Observable<AdvertisementDetails[]> {
    return this.getAdvertisementDetails(0, pageSize);
  }

  loadMoreAdvertisements(page: number, pageSize: number = 10): Observable<AdvertisementDetails[]> {
    return this.getAdvertisementDetails(page, pageSize);
  }

  updateLikes(advertisementId: number): Observable<HttpResponse<string>> {
    const userName =
      this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.UPVOTE_ADVERTISEMENT(advertisementId),
      {},
      {
        headers: new HttpHeaders({
          username: userName,
          authorization: `Bearer ${this.token}`,
        }),
        observe: "response",
        responseType: "text",
      }
    );
  }

  updateDislikes(advertisementId: number): Observable<HttpResponse<string>> {
    const userName =
      this.jwtDecoderService.decodeInfoFromToken(this.token)["sub"] || "";
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.DISLIKE_ADVERTISEMENT(advertisementId),
      {},
      {
        responseType: "text",
        observe: "response",
        headers: new HttpHeaders({
          username: userName,
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  savePost(
    username: string,
    advertisementId: number
  ): Observable<HttpResponse<AdvertisementDetails>> {
    return this.http.post<AdvertisementDetails>(
      API_CONFIG.ADVERTISEMENT_EVENTS.SAVE_ADVERTISEMENT,
      {
        username: username,
        advertisementId: advertisementId,
      },
      {
        responseType: "json",
        observe: "response",
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        }),
      }
    );
  }

  followUser(sourceUsername: string, username: string): Observable<any> {
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.FOLLOW(sourceUsername, username),
      {},
      {
        responseType: "json",
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  unfollowUser(sourceUsername: string, username: string): Observable<any> {
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.UNFOLLOW(sourceUsername, username),
      {},
      {
        responseType: "json",
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  reportPost(advertisementId: number): Observable<any> {
    let token = localStorage.getItem("token") || "";
    let userName =
      this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.REPORT_ADVERTISEMENT,
      {
        advertisementId: advertisementId,
        usernameOfReporter: userName,
      },
      {
        responseType: "json",
        headers: new HttpHeaders(),
      }
    );
  }

  calculateExpiry(expiryDate: string): {
    remainingDays: number;
    remainingHours: number;
    isExpired: boolean;
  } {
    const expiry = new Date(expiryDate);
    const currentDate = new Date();
    const timeDiff = expiry.getTime() - currentDate.getTime();

    const remainingDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const remainingHours = Math.floor(
      (timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)
    );

    const isExpired =
      remainingDays < 0 || (remainingDays === 0 && remainingHours <= 0);

    return { remainingDays, remainingHours, isExpired };
  }
}