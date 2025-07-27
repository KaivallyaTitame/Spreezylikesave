import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferDescriptionDTO } from '../models/offerdescriptionGet';

@Injectable({
  providedIn: 'root'
})
export class OfferDescriptionService {

  constructor(private http: HttpClient) {}

  getOfferDescription(): Observable<OfferDescriptionDTO> {
    return this.http.get<OfferDescriptionDTO>('http://192.168.1.35:8082/feed/consumer/advertisement/offer-description', {
      responseType: 'json',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
      }),

    });
  }

}