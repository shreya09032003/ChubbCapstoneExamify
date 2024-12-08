import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  sendNotification(notification: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/send-notification`, notification);
  }

  getNotifications(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/user/notifications?role=${role}`);
  }
  
}
