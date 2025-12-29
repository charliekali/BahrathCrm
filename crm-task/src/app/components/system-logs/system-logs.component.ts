import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-system-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-logs.component.html',
  styleUrls: ['./system-logs.component.css']
})
export class SystemLogsComponent implements OnInit {

  logs: any[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getData().subscribe(d => {
      this.logs = d.logs;
    });
  }

  exportCSV() {
    alert('Logs exported (Mock)');
  }
}
