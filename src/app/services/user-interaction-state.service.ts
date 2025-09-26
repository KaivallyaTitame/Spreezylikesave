import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserInteractionState {
  advertisementId: number;
  isLiked: boolean;
  isDisliked: boolean;
  isSaved: boolean;
  likesCount: number;
  dislikesCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserInteractionStateService {
  private interactionStates = new Map<number, UserInteractionState>();
  private stateSubject = new BehaviorSubject<Map<number, UserInteractionState>>(new Map());
  
  constructor() {
    this.loadStateFromStorage();
  }

  getState(advertisementId: number): UserInteractionState | null {
    return this.interactionStates.get(advertisementId) || null;
  }

  updateState(advertisementId: number, updates: Partial<UserInteractionState>): void {
    const currentState = this.interactionStates.get(advertisementId) || {
      advertisementId,
      isLiked: false,
      isDisliked: false,
      isSaved: false,
      likesCount: 0,
      dislikesCount: 0
    };

    const newState = { ...currentState, ...updates };
    this.interactionStates.set(advertisementId, newState);
    this.saveStateToStorage();
    this.stateSubject.next(new Map(this.interactionStates));
  }

  initializeState(advertisementId: number, initialState: UserInteractionState): void {
    if (!this.interactionStates.has(advertisementId)) {
      this.interactionStates.set(advertisementId, initialState);
      this.saveStateToStorage();
    }
  }

  getStateObservable(): Observable<Map<number, UserInteractionState>> {
    return this.stateSubject.asObservable();
  }

  clearState(): void {
    this.interactionStates.clear();
    this.saveStateToStorage();
    this.stateSubject.next(new Map());
  }

  private saveStateToStorage(): void {
    try {
      const stateArray = Array.from(this.interactionStates.entries());
      localStorage.setItem('userInteractionStates', JSON.stringify(stateArray));
    } catch (error) {
      console.error('Failed to save interaction states to localStorage:', error);
    }
  }

  private loadStateFromStorage(): void {
    try {
      const stored = localStorage.getItem('userInteractionStates');
      if (stored) {
        const stateArray = JSON.parse(stored);
        this.interactionStates = new Map(stateArray);
        this.stateSubject.next(new Map(this.interactionStates));
      }
    } catch (error) {
      console.error('Failed to load interaction states from localStorage:', error);
      this.interactionStates = new Map();
    }
  }
}