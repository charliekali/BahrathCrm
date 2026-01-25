import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { RbacService, Role, ModuleName } from './rbac.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private rbac: RbacService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  login(user: any) {
    this.currentUserSubject.next(user);

    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout() {
    this.currentUserSubject.next(null);

    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getRole(): Role | null {
    return this.getCurrentUser()?.role ?? null;
  }

  isSuperAdmin(): boolean {
    return this.getRole() === 'superadmin';
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  hasPermission(module: string, permission: string): boolean {
    const role = this.getRole();
    if (!role) return false;
    const mod = module as ModuleName;

    return this.rbac.hasPermission(role, mod, permission);
  }
}
