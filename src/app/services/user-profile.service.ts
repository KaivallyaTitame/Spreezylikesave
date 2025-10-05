import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, timeout } from "rxjs";
import { AdvertisementDetails } from "src/app/models/ad-details";
import { API_CONFIG } from "../api-config";
import { UserDetails } from "../models/UserDetails";

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(private http: HttpClient) {}
  getUserDetails(username: string): Observable<UserDetails> {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    return this.http
      .get<UserDetails>(API_CONFIG.GET_BUSINESS_DETAILS(username), {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        timeout(15000),
        catchError((error) => {
          console.log(error);
          if (error.name === "TimeoutError") {
            return throwError(
              () => new Error("Request timed out while fetching user details.")
            );
          }
          throw(error);
        })
      );
  }

  getProfilePosts(
    username: string,
    page: number,
    postsPerPage: number
  ): Observable<AdvertisementDetails[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const url = `${API_CONFIG.GET_PROFILE_POSTS(
      username
    )}?page=${page}&pageSize=${postsPerPage}`;
    return this.http
      .get<AdvertisementDetails[]>(url, {
        responseType: "json",
        headers: headers,
      })
      .pipe(
        timeout(15000),
        catchError((error) => {
          if (error.name === "TimeoutError") {
            return throwError(
              () => new Error("Request timed out while fetching profile posts.")
            );
          }
          throw(error);
        })
      );
  }

  getSavedPosts(
    username: string,
    page: number,
    postsPerPage: number
  ): Observable<AdvertisementDetails[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    const url = `${API_CONFIG.GET_SAVED_POSTS(
      username
    )}?page=${page}&pageSize=${postsPerPage}`;
    return this.http
      .get<AdvertisementDetails[]>(url, {
        responseType: "json",
        headers: headers,
      })
      .pipe(
        timeout(15000),
        catchError((error) => {
          if (error.name === "TimeoutError") {
            return throwError(
              () => new Error("Request timed out while fetching saved posts.")
            );
          }
          throw(error); 
        })
      );
  }
  
  checkIsFollowing(source: string, target: string): Observable<boolean> {
  const token = localStorage.getItem("token");
  return this.http
    .get<boolean>(API_CONFIG.IS_FOLLOWING(source, target), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    })
    .pipe(
      timeout(15000),
      catchError((error) => {
        return throwError(() => error);
      })
    );
}
}
