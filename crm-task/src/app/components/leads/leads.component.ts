import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- needed for ngModel
import { LeadService, Lead } from '../../services/lead.service';

@Component({
  selector: 'app-leads',
  standalone: true, // important in Angular 17+
  imports: [CommonModule, FormsModule], // import needed modules
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
    this.leadService.createLead({ name: this.name, email: this.email });
    this.name = '';
    this.email = '';
  }

  changeStatus(lead: Lead, status: Lead['status']) {
    this.leadService.updateLead(lead.id, { status });
  }

  assignLead(lead: Lead, userEmail: string) {
    this.leadService.assignLead(lead.id, userEmail);
  }
}
