import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer, switchMap, catchError, of } from 'rxjs';
import { API_CONFIG } from '../api-config';
import { JwtDecoderService } from './jwtDecoder/jwt-decoder.service';
import { UserInteractionStateService, UserInteractionState } from './user-interaction-state.service';
import { BulkUserInteractionDTO, UserInteractionDTO, UserInteractionSyncResponse } from '../models/user-interaction-dto';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionSyncService {
  private syncInterval = 30000; // Sync every 30 seconds
  private pendingSync = new Set<number>();

  constructor(
    private http: HttpClient,
    private jwtDecoder: JwtDecoderService,
    private stateService: UserInteractionStateService
  ) {
    this.startPeriodicSync();
  }

  syncUserInteractions(): Observable<UserInteractionSyncResponse> {
    const username = this.jwtDecoder.getUsername();
    const interactions: UserInteractionDTO[] = [];

    // Convert pending interactions to DTOs
    this.pendingSync.forEach(advertisementId => {
      const state = this.stateService.getState(advertisementId);
      if (state) {
        interactions.push({
          advertisementId,
          username,
          isLiked: state.isLiked,
          isDisliked: state.isDisliked,
          isSaved: state.isSaved,
          timestamp: new Date().toISOString()
        });
      }
    });

    if (interactions.length === 0) {
      return of({ success: true, message: 'No interactions to sync', syncedCount: 0 });
    }

    const bulkData: BulkUserInteractionDTO = { interactions };

    return this.http.post<UserInteractionSyncResponse>(
      API_CONFIG.ADVERTISEMENT_EVENTS.SYNC_USER_INTERACTIONS,
      bulkData,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        console.error('Failed to sync user interactions:', error);
        return of({ success: false, message: 'Sync failed', syncedCount: 0 });
      })
    );
  }

  loadUserInteractionsFromBackend(): Observable<UserInteractionState[]> {
    const username = this.jwtDecoder.getUsername();
    return this.http.get<UserInteractionState[]>(
      API_CONFIG.ADVERTISEMENT_EVENTS.GET_USER_INTERACTIONS(username),
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        console.error('Failed to load user interactions:', error);
        return of([]);
      })
    );
  }

  markForSync(advertisementId: number): void {
    this.pendingSync.add(advertisementId);
  }

  private startPeriodicSync(): void {
    timer(this.syncInterval, this.syncInterval).pipe(
      switchMap(() => this.syncUserInteractions())
    ).subscribe(result => {
      if (result.success && result.syncedCount > 0) {
        console.log(`Successfully synced ${result.syncedCount} interactions`);
        this.pendingSync.clear();
      }
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.jwtDecoder.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}