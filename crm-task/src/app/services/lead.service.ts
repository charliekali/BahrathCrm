import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';

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

  constructor(private notifService: NotificationService) {
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
    const newLead = { ...lead, assignedTo, nextFollowUp: this.getNextFollowUp() };
    this.leads.push(newLead);
    this.leadsSubject.next(this.leads);

    if (assignedTo) {
      this.notifService.addNotification(`Lead "${newLead.name}" assigned to ${assignedTo}`, '/sales/leads');
    }
  }

  updateLead(id: number, update: Partial<Lead>) {
    const index = this.leads.findIndex(l => l.id === id);
    if (index !== -1) {
      const oldLead = this.leads[index];
      this.leads[index] = { ...oldLead, ...update };
      this.leadsSubject.next(this.leads);

      if (update.status && update.status !== oldLead.status) {
        this.notifService.addNotification(`Lead "${oldLead.name}" status changed to ${update.status}`, '/sales/pipeline');
      }
    }
  }

  assignLead(id: number, email: string | null) {
    const lead = this.leads.find(l => l.id === id);
    if (!lead) return;

    this.updateLead(id, { assignedTo: email, nextFollowUp: email ? this.getNextFollowUp() : undefined });

    if (email) {
      this.notifService.addNotification(`Lead "${lead.name}" assigned to ${email}`, '/sales/leads');
    } else {
      this.notifService.addNotification(`Lead "${lead.name}" unassigned`, '/sales/leads');
    }
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
