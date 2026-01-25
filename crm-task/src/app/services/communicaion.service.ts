import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lead } from './lead.service';

export interface Message {
  id: number;
  leadId: number;
  leadName: string;
  type: 'Email' | 'SMS';
  content: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private messages: Message[] = [];
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private messageId = 1;

  sendMessage(lead: Lead, content: string, type: 'Email' | 'SMS' = 'Email') {
    const message: Message = {
      id: this.messageId++,
      leadId: lead.id,
      leadName: lead.name,
      type,
      content,
      date: new Date()
    };
    this.messages.push(message);
    this.messagesSubject.next(this.messages);
  }

  getMessagesForLead(leadId: number) {
    return this.messages.filter(msg => msg.leadId === leadId);
  }

  getAllMessages() {
    return this.messages;
  }
}
