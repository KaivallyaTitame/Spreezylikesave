import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { couponCodeForm } from '../models/couponCodeForm';
import { PostForm } from '../models/post-form';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://ddbb-2401-4900-1c43-c143-a1d0-169-2fb5-c996.ngrok-free.app'; 

  submitCouponData(data:couponCodeForm){
    this.http.post(
      'https://ddbb-2401-4900-1c43-c143-a1d0-169-2fb5-c996.ngrok-free.app/content/coupon/create', 
      data,
      {responseType:'text',
       headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true',
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

  submitPostForm(data:PostForm){
    console.log(data);
    this.http.post(
      'https://ddbb-2401-4900-1c43-c143-a1d0-169-2fb5-c996.ngrok-free.app/content/post/create',
       data, 
       {responseType:'text',
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'true',
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

  submitEventData(data:PostForm){
    this.http.post('URL', data, {responseType:'text'})
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

  getPresignedUrl(imageFileNames: string[], username: string) : any{
    this.http.post(
      `https://8c19-2401-4900-1c43-c143-b316-b7ca-ff77-e7b1.ngrok-free.app/content/generate-presigned-url`,
      { imageFileNames, username },
      {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'true',
        }),
      }
    ).subscribe({
      next: (presignedUrl) => {
        console.log('Presigned URL retrieved successfully:', presignedUrl);
      },
      error: (error: any) => {
        console.error('Error retrieving presigned URL:', error);
      }
    });
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
        console.error('error in uploading image to s3', error);
      }
    });
  }
  
}
