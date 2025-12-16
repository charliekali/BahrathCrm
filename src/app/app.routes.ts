import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SuperAdminLayoutComponent } from './layout/super-admin-layout/super-admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { UserManagementComponent } from './components/user/user-management.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SystemLogsComponent } from './components/system-logs/system-logs.component';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'subscriptions', component: SubscriptionComponent },
      { path: 'logs', component: SystemLogsComponent }

    ]
  },

  {
    path: '',
    component: SalesDashboardComponent,
    children: [
      { path: 'sales-dashboard', component: SalesDashboardComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
