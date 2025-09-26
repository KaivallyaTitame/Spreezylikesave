import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { API_CONFIG } from "../api-config";
import { AdvertisementDetails, InsightDetails } from "../models/ad-details";
import { JwtDecoderService } from "./jwtDecoder/jwt-decoder.service";
import { UserInteractionStateService } from "./user-interaction-state.service";
import { UserInteractionSyncService } from "./user-interaction-sync.service";

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

  constructor(
    private http: HttpClient,
    private jwtDecoderService: JwtDecoderService,
    private stateService: UserInteractionStateService,
    private syncService: UserInteractionSyncService
  ) {}

  getAdvertisementDetails(page: number = 0, pageSize: number = 10): Observable<AdvertisementDetails[]> {
    
    const url =
      API_CONFIG.ADVERTISEMENT_EVENTS.GET_ADVERTISEMENT_DETAILS(this.jwtDecoderService.getUsername());
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
      "Content-Type": "application/json",
    });
    const params = new HttpParams()
      .set("page", page.toString())
      .set("pageSize", pageSize.toString());
    
    return this.http.request<AdvertisementDetails[]>("GET", url, {
      headers,
      params,
      responseType: "json",
    }).pipe(
      tap(ads => {
        // Initialize state for each advertisement
        ads.forEach(ad => {
          const existingState = this.stateService.getState(ad.advertisementId);
          if (!existingState) {
            this.stateService.initializeState(ad.advertisementId, {
              advertisementId: ad.advertisementId,
              isLiked: false,
              isDisliked: false,
              isSaved: false,
              likesCount: ad.likes,
              dislikesCount: ad.dislikes
            });
          }
        });
      })
    );
  }

  getAdvertisementDetailsPaginated(page: number = 0, pageSize: number = 10): Observable<PaginatedResponse<AdvertisementDetails>> {
    const url =
      API_CONFIG.ADVERTISEMENT_EVENTS.GET_ADVERTISEMENT_DETAILS(this.jwtDecoderService.getUsername());
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
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

  getFreshAdvertisements(pageSize: number = 5): Observable<AdvertisementDetails[]> {
    return this.getAdvertisementDetails(0, pageSize);
  }

  loadMoreAdvertisements(page: number, pageSize: number = 5): Observable<AdvertisementDetails[]> {
    return this.getAdvertisementDetails(page, pageSize);
  }

  getAdvertisementInsights(advertisementId: number): Observable<InsightDetails> {
    const url =
      API_CONFIG.ADVERTISEMENT_EVENTS.GET_ADVERTISEMENT_INSIGHTS(advertisementId);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
      "Content-Type": "application/json",
    });
    
    return this.http.request<InsightDetails>("GET", url, {
      headers,
      responseType: "json",
    });
  }

  updateLikes(advertisementId: number): Observable<HttpResponse<string>> {
    const request = this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.UPVOTE_ADVERTISEMENT(advertisementId),
      {},
      {
        headers: new HttpHeaders({
          username: this.jwtDecoderService.getUsername(),
          authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
        }),
        observe: "response",
        responseType: "text",
      }
    );

    return request.pipe(
      tap(response => {
        if (response.status === 200 || response.status === 201) {
          const currentState = this.stateService.getState(advertisementId);
          if (currentState) {
            this.stateService.updateState(advertisementId, {
              isLiked: true,
              isDisliked: false,
              likesCount: response.status === 201 ? 
                currentState.likesCount + 1 : 
                currentState.likesCount + 1,
              dislikesCount: response.status === 200 ? 
                currentState.dislikesCount - 1 : 
                currentState.dislikesCount
            });
          }
          this.syncService.markForSync(advertisementId);
        }
      })
    );
  }

  updateDislikes(advertisementId: number): Observable<HttpResponse<string>> {
    const request = this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.DISLIKE_ADVERTISEMENT(advertisementId),
      {},
      {
        responseType: "text",
        observe: "response",
        headers: new HttpHeaders({
          username: this.jwtDecoderService.getUsername(),
          Authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
        }),
      }
    );

    return request.pipe(
      tap(response => {
        if (response.status === 200 || response.status === 201) {
          const currentState = this.stateService.getState(advertisementId);
          if (currentState) {
            this.stateService.updateState(advertisementId, {
              isDisliked: true,
              isLiked: false,
              dislikesCount: response.status === 201 ? 
                currentState.dislikesCount + 1 : 
                currentState.dislikesCount + 1,
              likesCount: response.status === 200 ? 
                currentState.likesCount - 1 : 
                currentState.likesCount
            });
          }
          this.syncService.markForSync(advertisementId);
        }
      })
    );
  }

  savePost(
    username: string,
    advertisementId: number
  ): Observable<HttpResponse<AdvertisementDetails>> {
    const request = this.http.post<AdvertisementDetails>(
      API_CONFIG.ADVERTISEMENT_EVENTS.SAVE_ADVERTISEMENT,
      {
        username: username,
        advertisementId: advertisementId,
      },
      {
        responseType: "json",
        observe: "response",
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
          "Content-Type": "application/json",
        }),
      }
    );

    return request.pipe(
      tap(response => {
        if (response.status === 200 || response.status === 201) {
          const currentState = this.stateService.getState(advertisementId);
          if (currentState) {
            this.stateService.updateState(advertisementId, {
              isSaved: !currentState.isSaved
            });
          }
          this.syncService.markForSync(advertisementId);
        }
      })
    );
  }

  followUser(sourceUsername: string, username: string): Observable<HttpResponse<any>> {
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.FOLLOW(sourceUsername, username),
      {},
      { 
        observe: "response",
        responseType: "json",
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
        }),
      }
    );
  }

  unfollowUser(sourceUsername: string, username: string): Observable<HttpResponse<any>> {
    return this.http.delete(
      API_CONFIG.ADVERTISEMENT_EVENTS.UNFOLLOW(sourceUsername, username),
      {
        observe: "response",
        responseType: "json",
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.jwtDecoderService.getToken()}`,
        }),
      }
    );
  }

  reportPost(advertisementId: number): Observable<any> {
    return this.http.post(
      API_CONFIG.ADVERTISEMENT_EVENTS.REPORT_ADVERTISEMENT,
      {
        advertisementId: advertisementId,
        usernameOfReporter: this.jwtDecoderService.getUsername(),
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