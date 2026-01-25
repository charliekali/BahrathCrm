import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadService, Lead } from '../../services/lead.service';
import { CommunicationService, Message } from '../../services/communicaion.service';

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comm-container">
      <h2>Communication Module</h2>

      <form (submit)="$event.preventDefault(); sendMessage()">
        <select [(ngModel)]="selectedLeadId" name="leadSelect" required>
          <option value="" disabled>Select Lead</option>
          <option *ngFor="let lead of leads" [ngValue]="lead.id">{{ lead.name }} ({{ lead.email }})</option>
        </select>

        <textarea [(ngModel)]="messageContent" name="messageContent" placeholder="Write your message..." required></textarea>

        <button type="submit" [disabled]="!selectedLeadId || !messageContent.trim()">Send Message</button>
      </form>

      <h3>Communication History</h3>
      <table *ngIf="messages.length > 0">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Type</th>
            <th>Content</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let msg of messages">
            <td>{{ msg.leadName }}</td>
            <td>{{ msg.type }}</td>
            <td>{{ msg.content }}</td>
            <td>{{ msg.date | date:'short' }}</td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="messages.length === 0">No messages sent yet.</p>
    </div>
  `,
  styles: [`
    .comm-container { padding: 20px; font-family: Arial; max-width: 700px; margin: auto; }
    form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
    select, textarea { padding: 8px; font-size: 14px; }
    button { width: 150px; padding: 8px; cursor: pointer; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background-color: #f0f0f0; }
  `]
})
export class CommunicationComponent {
  leads: Lead[] = [];
  messages: Message[] = [];

  selectedLeadId: number | null = null;
  messageContent = '';

  constructor(
    private leadService: LeadService,
    private commService: CommunicationService
  ) {
    this.leads = this.leadService.getAllLeads();
    this.commService.messages$.subscribe(msgs => this.messages = msgs);
  }

  sendMessage() {
    if (!this.selectedLeadId || !this.messageContent.trim()) return;
    const leadId = Number(this.selectedLeadId);
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;

    this.commService.sendMessage(lead, this.messageContent, 'Email');
    this.messageContent = '';
    this.selectedLeadId = null;
  }
}
