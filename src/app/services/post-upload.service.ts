import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresignedUrl } from '../models/presigned-url';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root',
})
export class PostUploadService {
  constructor(private http: HttpClient) {}

  // Fetch presigned URLs for uploading Aadhar and PAN card images
  getPresignedUrl(imageFileNames: string[], username: string): Observable<PresignedUrl> {
    return this.http.post<PresignedUrl>(API_CONFIG.SETTINGS.GENERATE_PRESIGNED_URL, {
      imageFileNames,
      username
    });
  }
  

  // Upload a file to S3 using the presigned URL
  uploadToS3(file: File, presignedUrl: string): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    return this.http.put<void>(presignedUrl, file, { headers });
  }
}
