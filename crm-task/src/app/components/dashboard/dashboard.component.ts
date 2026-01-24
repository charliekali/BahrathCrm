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

  totalRevenue = 0;
  activeCustomers = 0;
  monthlyRevenue: any[] = [];

  stats = {
    organizations: 0,
    users: 0,
    leads: 0,
    subscriptions: 0,
    mrr: 0
  };

  constructor(
    private data: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.data.getData().subscribe(d => {

      this.monthlyRevenue = d.monthlyRevenue || [];
      this.totalRevenue = this.monthlyRevenue
        .reduce((sum: number, m: any) => sum + m.amount, 0);

      this.activeCustomers = d.organizations
        ?.filter((o: any) => o.status === 'active').length || 0;

      this.stats.organizations = d.organizations?.length || 0;
      this.stats.users = d.users?.length || 0;
      this.stats.leads = d.leads?.length || 0;
      this.stats.subscriptions = d.subscriptions
        ?.filter((s: any) => s.active).length || 0;

      this.stats.mrr = d.subscriptions
        ?.filter((s: any) => s.active)
        .reduce((sum: number, s: any) => sum + s.monthlyPrice, 0) || 0;

      this.cdr.detectChanges();
    });
  }
}
