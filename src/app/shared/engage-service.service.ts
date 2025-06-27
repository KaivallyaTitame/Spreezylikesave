import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config';
import { AdvertisementDetails } from '../models/ad-details';
import { JwtDecoderService } from '../services/jwtDecoder/jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class EngageServiceService {
  constructor(private http: HttpClient, private jwtDecoderService: JwtDecoderService) { }

  incrementEngagementCount(advertisementId: number): Observable<any> {
    const token = localStorage.getItem("token") || "";
    const userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const url = API_CONFIG.ADVERTISEMENT_EVENTS.ENGAGE(1);
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.request<AdvertisementDetails[]>("POST", url, {
      headers,
      responseType: 'json'
    });
  }
}
