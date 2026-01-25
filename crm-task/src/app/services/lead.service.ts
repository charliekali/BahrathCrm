import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
  source?: string;
  assignedTo?: string;
  tags?: string[];
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private leads: Lead[] = [];
  private leadsSubject = new BehaviorSubject<Lead[]>([]);

  leads$ = this.leadsSubject.asObservable();

  private idCounter = 1;

  constructor() {}

  createLead(lead: Partial<Lead>) {
    const newLead: Lead = {
      id: this.idCounter++,
      status: 'New',
      ...lead
    } as Lead;
    this.leads.push(newLead);
    this.leadsSubject.next(this.leads);
    return newLead;
  }

  updateLead(id: number, updates: Partial<Lead>) {
    const index = this.leads.findIndex(l => l.id === id);
    if (index > -1) {
      this.leads[index] = { ...this.leads[index], ...updates };
      this.leadsSubject.next(this.leads);
      return this.leads[index];
    }
    return null;
  }

  getLead(id: number) {
    return this.leads.find(l => l.id === id) || null;
  }

  getAllLeads() {
    return this.leads;
  }

  deleteLead(id: number) {
    this.leads = this.leads.filter(l => l.id !== id);
    this.leadsSubject.next(this.leads);
  }

  assignLead(id: number, userEmail: string) {
    return this.updateLead(id, { assignedTo: userEmail });
  }
}
