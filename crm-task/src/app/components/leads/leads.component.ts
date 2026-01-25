import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadService, Lead } from '../../services/lead.service';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent {
  leads: Lead[] = [];
  name = '';
  email = '';

  constructor(private leadService: LeadService) {
    this.leads = this.leadService.getAllLeads();
    this.leadService.leads$.subscribe(data => this.leads = data);
  }
  addLead() {
    if (!this.name || !this.email) return;

    const newLead: Lead = {
      id: this.leads.length + 1,
      name: this.name,
      email: this.email,
      status: 'New',
      assignedTo: null,
      autoAssigned: false, 
      nextFollowUp: undefined
    };

    this.leadService.createLead(newLead);
    this.name = '';
    this.email = '';
  }

  changeStatus(lead: Lead, status: Lead['status']) {
    this.leadService.updateLead(lead.id, { status });
  }
  assignLead(lead: Lead, userEmail: string) {
    this.leadService.assignLead(lead.id, userEmail);
  }
  unassignLead(lead: Lead) {
    this.leadService.assignLead(lead.id, null);
  }
}
