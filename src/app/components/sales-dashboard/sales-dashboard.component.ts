import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sales-dashboard">
      <h2>Sales Dashboard</h2>
      <p>Welcome, {{ username }}</p>

      <div class="kpi-cards">
        <div class="card">
          <h3>Assigned Leads</h3>
          <p>{{ assignedLeads }}</p>
        </div>
        <div class="card">
          <h3>Active Deals</h3>
          <p>{{ activeDeals }}</p>
        </div>
      </div>

      <h3>Recent Activity</h3>
      <table>
        <thead>
          <tr>
            <th>Lead Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let lead of recentLeads">
            <td>{{ lead.name }}</td>
            <td>{{ lead.status }}</td>
            <td>{{ lead.amount | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .sales-dashboard { padding: 20px; font-family: Arial; }
    .kpi-cards { display: flex; gap: 20px; margin-bottom: 20px; }
    .card { background: #f0f0f0; padding: 15px; border-radius: 8px; text-align: center; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
  `]
})
export class SalesDashboardComponent {
  username = 'Sales User';
  assignedLeads = 12;
  activeDeals = 5;

  recentLeads = [
    { name: 'Lead 1', status: 'Contacted', amount: 2000 },
    { name: 'Lead 2', status: 'Negotiation', amount: 5000 },
    { name: 'Lead 3', status: 'Closed', amount: 3000 }
  ];
}
