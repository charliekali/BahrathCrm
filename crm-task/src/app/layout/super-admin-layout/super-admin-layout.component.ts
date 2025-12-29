import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-super-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './super-admin-layout.component.html',
  styleUrls: ['./super-admin-layout.component.css']
})
export class SuperAdminLayoutComponent {
}
