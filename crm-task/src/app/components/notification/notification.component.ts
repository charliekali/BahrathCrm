import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppNotification, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="notif-container">
      <h4>Notifications</h4>
      <div *ngIf="notifications.length === 0">No notifications</div>
      <ul>
        <li *ngFor="let notif of notifications">
          <a *ngIf="notif.link" [routerLink]="notif.link">{{ notif.message }}</a>
          <span *ngIf="!notif.link">{{ notif.message }}</span>
          <small>{{ notif.date | date:'short' }}</small>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .notif-container {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      background-color: #f9f9f9;
      max-height: 200px;
      overflow-y: auto;
    }
    ul { padding-left: 15px; margin: 0; }
    li { margin-bottom: 5px; }
    a { text-decoration: none; color: #007bff; }
    a:hover { text-decoration: underline; }
    small { display: block; color: #888; font-size: 11px; }
  `]
})
export class NotificationsComponent {
  notifications: AppNotification[] = [];

  constructor(private notifService: NotificationService) {
    this.notifService.notifications$.subscribe(notifs => this.notifications = [...notifs].reverse());
  }
}
