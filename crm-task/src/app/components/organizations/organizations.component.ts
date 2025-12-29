import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  organizations: any[] = [];

  constructor(public data: DataService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.data.getData().subscribe(d => {
      this.organizations = d.organizations;
       this.cdr.detectChanges();
        console.log('API DATA:', this.organizations);
    });
   
  }

  approve(org: any) {
    org.active = true;
  }

  reject(org: any) {
    org.active = false;
  }
}
