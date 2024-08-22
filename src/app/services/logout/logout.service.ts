import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'cypress/types/jquery';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl =
    "https://b5f6-2409-40c2-1041-30e2-2c85-2772-3041-ebee.ngrok-free.app/";

  logout(token: string, userName: string){
    this.http.post(`${this.apiUrl}auth/${userName}/logout`, {}, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
