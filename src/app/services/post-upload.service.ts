import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_CONFIG } from '../api-config';
import { CouponDetails } from '../models/coupon-details';
import { PostDetails } from '../models/post-details';
import { EventDetails } from '../models/event-details';
import { PresignedUrl } from '../models/presigned-url';

@Injectable({
  providedIn: 'root',
})
export class PostUploadService {
  private generatedFileNamesSubject = new BehaviorSubject<string[]>([]);
  generatedFileNames$ = this.generatedFileNamesSubject.asObservable();
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  setGeneratedFileNames(fileNames: string[]): void {
    this.generatedFileNamesSubject.next(fileNames);
    console.log('Generated file names:', fileNames);
  }

  getGeneratedFileNames(): string[] {
    return this.generatedFileNamesSubject.getValue();
  }

  submitCouponData(data: CouponDetails): Observable<string> {
    return this.http.post<string>(API_CONFIG.POST_CREATION.CREATE_COUPON, data, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json',
    });
  }

  submitPostForm(data: PostDetails): Observable<string> {
    return this.http.post<string>(API_CONFIG.POST_CREATION.CREATE_POST, data, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json',
    });
  }

  submitEventData(data: EventDetails): Observable<string> {
    return this.http.post<string>(API_CONFIG.POST_CREATION.CREATE_EVENT, data, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json',
    });
  }

  getPresignedUrl(imageFileNames: string[], username: string): Observable<PresignedUrl> {
    return this.http.post<PresignedUrl>(
      API_CONFIG.SETTINGS.GENERATE_PRESIGNED_URL,
      { imageFileNames, username ,headers: this.getHeaders()},
      
    );
  }

  uploadToS3(file: File, presignedUrl: string): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    return this.http.put<void>(presignedUrl, file, { headers }); 
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  }
}
