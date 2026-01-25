import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
  const module = route.data['module'] as string;
  const permission = route.data['permission'] as string;

  const user = this.auth.getCurrentUser();
  if (!user) {
    this.router.navigate(['/login']);
    return false;
  }
  if (user.role === 'sales') {
    return true;
  }
  if (!this.auth.hasPermission(module, permission)) {
    this.router.navigate(['/dashboard']);
    return false;
  }

  return true;
}

}
