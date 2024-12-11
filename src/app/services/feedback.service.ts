import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeedbackRequest } from '../models/feedbackrequest';
import { FeedbackResponse } from '../models/feedback-response';
import { API_CONFIG } from 'src/app/api-config';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  feedback(
    feedbackRequest: FeedbackRequest,
    onSuccess: (response: FeedbackResponse) => void,
    onError: (error: any) => void
  ): void {
    const headers = new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' });

    this.http
      .post<FeedbackResponse>(API_CONFIG.SAVE_FEEDBACK, feedbackRequest, { headers })
      .subscribe({
        next: onSuccess,
        error: onError,
      });
  }
}
