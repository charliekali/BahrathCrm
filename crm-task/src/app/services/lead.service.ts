import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
  assignedTo: string | null;
  source?: string;
  notes?: string;
  nextFollowUp?: string;
  autoAssigned?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private leadsSubject = new BehaviorSubject<Lead[]>([]);
  leads$ = this.leadsSubject.asObservable();
  private leads: Lead[] = [];
  private salesUsers = ['sales@abc.com'];

  constructor() {
    this.leads = [
      { id: 1, name: 'Lead 1', email: 'lead1@example.com', status: 'New', assignedTo: null },
      { id: 2, name: 'Lead 2', email: 'lead2@example.com', status: 'Contacted', assignedTo: 'sales@abc.com', nextFollowUp: '2026-01-28' },
    ];
    this.leadsSubject.next(this.leads);
  }

  getAllLeads() {
    return this.leads;
  }

  createLead(lead: Lead) {
    const assignedTo = this.salesUsers.length ? this.salesUsers[0] : null;
    this.leads.push({ ...lead, assignedTo, nextFollowUp: this.getNextFollowUp() });
    this.leadsSubject.next(this.leads);
  }

  updateLead(id: number, update: Partial<Lead>) {
    const index = this.leads.findIndex(l => l.id === id);
    if (index !== -1) {
      this.leads[index] = { ...this.leads[index], ...update };
      this.leadsSubject.next(this.leads);
    }
  }

  assignLead(id: number, email: string | null) {
    this.updateLead(id, { assignedTo: email, nextFollowUp: email ? this.getNextFollowUp() : undefined });
  }

  unassignLead(id: number) {
    this.assignLead(id, null);
  }

  private getNextFollowUp(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }
}
