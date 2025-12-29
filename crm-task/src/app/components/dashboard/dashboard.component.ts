import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  totalRevenue = 0;
  activeCustomers = 0;
  monthlyRevenue: any[] = [];

  constructor(private data: DataService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.data.getData().subscribe(d => {
        console.log(d,"data")
      this.totalRevenue = d.summary.totalRevenue;
      this.activeCustomers = d.summary.activeCustomers;
      this.monthlyRevenue = d.monthlyRevenue;
      this.stats = d.stats;
      this.cdr.detectChanges();
    });
  }

}
