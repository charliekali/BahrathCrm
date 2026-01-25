import { Injectable } from '@angular/core';

export type Role = 'superadmin' | 'orgadmin' | 'staff' | 'viewer';
export type ModuleName = 'leads' | 'deals' | 'orgs' | 'users';

interface ModulePermissions {
  [module: string]: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RbacService {

  private roles: Role[] = ['superadmin', 'orgadmin', 'staff', 'viewer'];
  private permissionsMatrix: Record<Role, ModulePermissions> = {
    superadmin: {
      leads: ['read', 'write', 'delete', 'export'],
      deals: ['read', 'write', 'delete', 'export'],
      orgs: ['read', 'write', 'delete', 'export'],
      users: ['read', 'write', 'delete', 'export'],
    },
    orgadmin: {
      leads: ['read', 'write', 'export'],
      deals: ['read', 'write', 'export'],
      orgs: ['read', 'write'],
      users: ['read', 'write'],
    },
    staff: {
      leads: ['read', 'write'],
      deals: ['read', 'write'],
      users: ['read'],
    },
    viewer: {
      leads: ['read'],
      deals: ['read'],
      users: ['read'],
    }
  };

  constructor() {}

  isRoleHigherOrEqual(roleA: Role, roleB: Role): boolean {
    return this.roles.indexOf(roleA) <= this.roles.indexOf(roleB);
  }

  hasPermission(role: Role, module: ModuleName, permission: string): boolean {
    const perms = this.permissionsMatrix[role];
    if (!perms) return false;
    return perms[module]?.includes(permission) ?? false;
  }
}
