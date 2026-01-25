import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from '../../components/notification/notification.component'; // Make sure this path is correct

@Component({
  selector: 'app-sales-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <h3>DataHaven</h3>
        <a routerLink="/sales/dashboard">Dashboard</a>
        <a routerLink="/sales/leads">Leads</a>
        <a routerLink="/sales/pipeline">Pipeline</a>
        <a routerLink="/sales/communication">Communication</a>
        <a routerLink="/sales/notifications">Notifications</a>
      </aside>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout { display: flex; min-height: 100vh; font-family: Arial, sans-serif; }
    .sidebar { width: 220px; background: #0b132b; color: #fff; padding: 20px; }
    .sidebar h3 { margin-bottom: 20px; }
    .sidebar a { display: block; color: #cbd5ff; text-decoration: none; padding: 10px 0; }
    .sidebar a.active, .sidebar a:hover { color: #fff; font-weight: bold; }
    .content { flex: 1; padding: 20px; background: #f5f7fb; }
  `]
})
export class SalesLayoutComponent {}
