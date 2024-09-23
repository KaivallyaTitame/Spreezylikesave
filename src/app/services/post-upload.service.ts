import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { couponDetails } from '../models/coupon-details';
import { postDetails } from '../models/post-details';
import { eventDetails } from '../models/event-details';
import { PresignedUrl } from '../models/presigned-url';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class postUpload {

  private generatedFileNamesSubject = new BehaviorSubject<string[]>([]);
  generatedFileNames$ = this.generatedFileNamesSubject.asObservable();

  constructor(private http: HttpClient) { }

  setGeneratedFileNames(fileNames: string[]): void {
    this.generatedFileNamesSubject.next(fileNames);
    console.log('Generated file names:', fileNames);
  }

  getGeneratedFileNames(): string[] {
    return this.generatedFileNamesSubject.getValue();
  }

  submitCouponData(data: couponDetails): void {
    this.http.post(
      `${environment.apiGateway}/content/coupon/create`,
      data,
      {
        responseType: 'text',
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          'accept': '*/*'
        })
      }
    ).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        alert('Coupon details submitted successfully');
      },
      error: (error) => {
        console.error('Error occurred:', error);
        alert('Error submitting coupon details');
      }
    });
  }

  submitPostForm(data: postDetails): void {
    this.http.post(
      `${environment.apiGateway}/content/post/create`,
      data,
      {
        responseType: 'text',
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json'
        })
      }
    ).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
      },
      error: (error) => {
        console.error('Error occurred:', error);
      }
    });
  }

  submitEventData(data: eventDetails): void {
    this.http.post(
      `${environment.apiGateway}/content/event/create`,
      data,
      {
        responseType: 'text',
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json'
        })
      }
    ).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
      },
      error: (error) => {
        console.error('Error occurred:', error);
      }
    });
  }

  getPresignedUrl(imageFileNames: string[], username: string): Observable<PresignedUrl> {
    return this.http.post<PresignedUrl>(
      `${environment.apiGateway}/content/generate-presigned-url`,
      { imageFileNames, username },
    );
  }

  uploadToS3(file: File, presignedUrl: string){
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    return this.http.put(
      presignedUrl,
      file,
      { headers }
    ).subscribe({
      next: (response) => {
        console.log('uploaded sucessfully', response);
      },
      error: (error:any) => {
        console.error('Error uploading image to S3:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Response:', error.error);
      }
    });
  }
  
}
