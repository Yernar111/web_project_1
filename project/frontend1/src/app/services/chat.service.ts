import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly base = `${environment.apiBaseUrl}/api`;

  constructor(private http: HttpClient) {}

  send(message: string, history: ChatHistoryItem[]): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.base}/chat/`, {
      message,
      history,
    });
  }
}
