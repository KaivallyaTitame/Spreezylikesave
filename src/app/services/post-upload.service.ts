import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { couponDetails } from '../models/coupon-details';
import { postDetails } from '../models/post-details';
import { eventDetails } from '../models/event-details';
import { PresignedUrl } from '../models/presigned-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BackendService {

  constructor(private http:HttpClient) { }

  submitCouponData(data:couponDetails){
    this.http.post(
      'https://8d3b-2401-4900-1c43-9c3f-fcc1-f5e8-a115-5440.ngrok-free.app/content/coupon/create', 
      data,
      {responseType:'text',
       headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        'accept': '*/*'
      }),
     },
    )
    .subscribe({
      next: (response)=>{
        console.log('response got from backend is : ', response);
        alert('Coupon details submitted successfully');
        return `added successfully ${response}`;
      },
      error: (error)=>{
        console.log('error occured : ', error)
        return 'something is wrong in  funcion of backend service'
      }
    });
  }

  submitPostForm(data:postDetails){
    console.log(data);
    this.http.post(
     'https://8d3b-2401-4900-1c43-9c3f-fcc1-f5e8-a115-5440.ngrok-free.app/content/post/create',
       data, 
       {responseType:'text',
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json'
        }),
       }, 
      )
    .subscribe({
      next: (response)=>{
        console.log('response got from backend is : ', response);
        return `added successfully ${response}`;
      },
      error: (error)=>{
        console.log('error occured : ', error)
        return 'something is wrong in  funcion of backend service'
      }
    });
  }

  submitEventData(data:eventDetails){
    this.http.post('https://8d3b-2401-4900-1c43-9c3f-fcc1-f5e8-a115-5440.ngrok-free.app/content/event/create', data, {responseType:'text',
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json'
      }),
     })
    .subscribe({
      next: (response)=>{
        console.log('response got from backend is : ', response);
        return `added successfully ${response}`;
      },
      error: (error)=>{
        console.log('error occured : ', error)
        return 'something is wrong in  funcion of backend service'
      }
    });
  }

  getPresignedUrl(imageFileNames: string[], username: string) : Observable<PresignedUrl> {
    return this.http.post<PresignedUrl>(
      "https://8d3b-2401-4900-1c43-9c3f-fcc1-f5e8-a115-5440.ngrok-free.app/content/generate-presigned-url",
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
