import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInformation } from '../models/user-information';
import { BusinessInformation } from '../models/business-information';
import { PresignedUrl } from '../models/presigned-url';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private generatedFileNamesSubject = new BehaviorSubject<string[]>([]);
  generatedFileNames$ = this.generatedFileNamesSubject.asObservable();

  constructor(private http: HttpClient) {}

  setGeneratedFileNames(fileNames: string[]): void {
    this.generatedFileNamesSubject.next(fileNames);
    console.log('Generated file names:', fileNames);
  }

  getGeneratedFileNames(): string[] {
    return this.generatedFileNamesSubject.getValue();
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get(API_CONFIG.SETTINGS.GET_CONSUMER_DETAILS(username), {
      responseType: 'text',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        accept: '*/*',
      }),
    });
  }

  postUserDetails(data: UserInformation): Observable<string> {
    return this.http.post(API_CONFIG.SETTINGS.UPDATE_CONSUMER_DETAILS, data, {
      responseType: 'text',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        accept: '*/*',
      }),
    });
  }

  getBusinessDetails(username: string): Observable<any> {
    return this.http.get(API_CONFIG.SETTINGS.GET_BUSINESS_DETAILS(username), {
      responseType: 'text',
    });
  }

  postBusinessDetails(data: BusinessInformation): Observable<string> {
    return this.http.post(API_CONFIG.SETTINGS.UPDATE_BUSINESS_DETAILS, data, {
      responseType: 'text',
    });
  }

  getPresignedUrl(
    imageFileNames: string[],
    username: string
  ): Observable<PresignedUrl> {
    return this.http.post<PresignedUrl>(
      API_CONFIG.SETTINGS.GENERATE_PRESIGNED_URL,
      { imageFileNames, username }
    );
  }

  uploadToS3(file: File, presignedUrl: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    return this.http.put(presignedUrl, file, { headers });
  }

  getImageLink(username:string,imageFileName: string): Observable<string> {
    return this.http.get(API_CONFIG.SETTINGS.GET_IMAGE_LINK(imageFileName,username), {
      responseType: 'text',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        accept: '*/*',
      }),
    });
  }
}
