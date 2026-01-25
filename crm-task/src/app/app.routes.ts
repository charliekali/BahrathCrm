import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SuperAdminLayoutComponent } from './layout/super-admin-layout/super-admin-layout.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { UserManagementComponent } from './components/user/user-management.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SystemLogsComponent } from './components/system-logs/system-logs.component';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';

import { AuthGuard } from './services/auth.guard';
import { SuperAdminGuard } from './services/super-admin.guard';
import { PermissionGuard } from './services/permission.guard';
import { SalesLayoutComponent } from './layout/sales_layout/sales-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: SuperAdminLayoutComponent,
    canActivate: [SuperAdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'organizations', component: OrganizationsComponent },
      {
        path: 'users',
        component: UserManagementComponent,
        canActivate: [PermissionGuard],
        data: { module: 'users', permission: 'read' }
      },
      { path: 'subscriptions', component: SubscriptionComponent },
      { path: 'logs', component: SystemLogsComponent }
    ]
  },

{
  path: 'sales',
  component: SalesLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: SalesDashboardComponent },
    {
      path: 'leads',
      loadComponent: () => import('./components/leads/leads.component').then(m => m.LeadsComponent)
    },
    {
      path: 'pipeline',
      loadComponent: () => import('./components/pipeline/pipeline.component').then(m => m.PipelineComponent)
    },
    {
  path: 'communication',
  loadComponent: () =>
    import('./components/communication/communication.component').then(m => m.CommunicationComponent),
  canActivate: [PermissionGuard],
  data: { module: 'leads', permission: 'read' }
},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
