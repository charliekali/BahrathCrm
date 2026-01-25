import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService, Lead } from '../../services/lead.service';

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pipeline">
      <h2>Sales Pipeline</h2>

      <div class="columns">
        <div class="column" *ngFor="let stage of stages">
          <h3>{{ stage }}</h3>

          <div
            class="card"
            *ngFor="let lead of getLeadsByStatus(stage)"
          >
            <strong>{{ lead.name }}</strong>
            <p>{{ lead.email }}</p>

            <button
              *ngIf="stage !== 'Closed'"
              (click)="moveNext(lead)"
            >
              Move →
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pipeline {
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .columns {
      display: flex;
      gap: 16px;
    }

    .column {
      flex: 1;
      background: #f4f6f8;
      padding: 10px;
      border-radius: 8px;
      min-height: 300px;
    }

    .column h3 {
      text-align: center;
      margin-bottom: 10px;
    }

    .card {
      background: white;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .card button {
      margin-top: 8px;
      padding: 4px 8px;
      cursor: pointer;
    }
  `]
})
export class PipelineComponent {
  stages: Lead['status'][] = ['New', 'Contacted', 'Qualified', 'Closed'];
  leads: Lead[] = [];

  constructor(private leadService: LeadService) {
    this.leads = this.leadService.getAllLeads();
    this.leadService.leads$.subscribe(l => this.leads = l);
  }

  getLeadsByStatus(status: Lead['status']) {
    return this.leads.filter(l => l.status === status);
  }

  moveNext(lead: Lead) {
    const currentIndex = this.stages.indexOf(lead.status);
    const nextStatus = this.stages[currentIndex + 1];

    if (nextStatus) {
      this.leadService.updateLead(lead.id, { status: nextStatus });
    }
  }
}
