import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppNotification {
  id: number;
  message: string;
  date: Date;
  link?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: AppNotification[] = [];
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private idCounter = 1;

  addNotification(message: string, link?: string) {
    const notif: AppNotification = {
      id: this.idCounter++,
      message,
      date: new Date(),
      link
    };
    this.notifications.push(notif);
    this.notificationsSubject.next(this.notifications);
  }

  clearAll() {
    this.notifications = [];
    this.notificationsSubject.next(this.notifications);
  }
}
