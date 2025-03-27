import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { UserProfileDTO } from '../models/UserProfileDTO';
import { API_CONFIG } from 'src/app/api-config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSubject = new Subject<string>();
  private businessesSubject = new BehaviorSubject<UserProfileDTO[]>([]);
  
  businesses$ = this.businessesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initSearchSubscription(); 
  }

  private initSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.fetchBusinesses(query))
    ).subscribe(businesses => {
      this.businessesSubject.next(businesses);
    });
  }

  search(query: string): void {
    this.searchSubject.next(query);
  }

  clearSearch(): void {
    this.businessesSubject.next([]);
  }

  private fetchBusinesses(searchQuery: string): Observable<UserProfileDTO[]> {
    const url = API_CONFIG.SEARCH_BUSINESSES(searchQuery);
    return this.http.get<UserProfileDTO[]>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(() => of([]))
    );
  }

  toggleFollowStatus(sourceUsername: string, targetUsername: string, isFollowing: boolean): Observable<boolean> {
    const url = isFollowing
      ? API_CONFIG.FOLLOW_BUSINESS(sourceUsername, targetUsername) 
      : API_CONFIG.UNFOLLOW_BUSINESS(sourceUsername, targetUsername);
  
    const method = isFollowing ? 'post' : 'delete';  

    return this.http.request(method, url, { headers: this.getAuthHeaders() }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getImageUrl(profilePicture: string | null | undefined): string {
    if (!profilePicture || profilePicture.trim() === '') {
      return 'assets/default-pic.png';
    }
    if (profilePicture.startsWith('http://') || profilePicture.startsWith('https://')) {
      return profilePicture;
    }
    return `${API_CONFIG.IMAGE_URL}/${profilePicture}`;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
      console.error('No token found. Please log in again.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Correctly formatted Authorization header
      'Content-Type': 'application/json' // Optional: Include Content-Type if needed
    });
  }
  
}
