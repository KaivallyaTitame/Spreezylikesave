import { throwError, timeout, catchError, Observable } from "rxjs";
import { AdvertisementDetails } from "src/app/models/ad-details";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserDetails } from "../models/UserDetails";
import { API_CONFIG } from "../api-config";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private imageUrl = API_CONFIG.IMAGE_URL;

  constructor(private http: HttpClient) {}

  getImageUrl(username: string, imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
    // return `${this.imageUrl}/${username}/${imageName}`;
  }
  getUserDetails(username: string): Observable<UserDetails> {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    return this.http
      .get<UserDetails>(API_CONFIG.GET_BUSINESS_DETAILS(username), {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
      })
      // .pipe(
      //   timeout(15000),
      //   catchError((error) => {
      //     console.log(error);
      //     if (error.name === "TimeoutError") {
      //       return throwError(
      //         () => new Error("Request timed out while fetching user details.")
      //       );
      //     }
      //     return throwError(() => new Error("error"));
      //   })
      // );
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
      // .pipe(
      //   timeout(15000),
      //   catchError((error) => {
      //     if (error.name === "TimeoutError") {
      //       return throwError(
      //         () => new Error("Request timed out while fetching profile posts.")
      //       );
      //     }
      //     return throwError(() => new Error("Failed to fetch profile posts."));
      //   })
      // );
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
      // .pipe(
      //   timeout(15000),
      //   catchError((error) => {
      //     if (error.name === "TimeoutError") {
      //       return throwError(
      //         () => new Error("Request timed out while fetching saved posts.")
      //       );
      //     }
      //     return throwError(() => new Error("Failed to fetch saved posts."));
      //   })
      // );
  }
}
