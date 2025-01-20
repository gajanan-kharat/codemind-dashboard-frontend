import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken && decodedToken.role) {
        const expectedRole = route.data['expectedRole'];
        if (decodedToken.role === 'Admin') {
          return true; 
        }
        if (decodedToken.role === expectedRole) {
          return true;
        }
        // this.redirectBasedOnRole(decodedToken.role);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  /*private redirectBasedOnRole(role: string) {
    if (role === 'Admin') {
      this.router.navigate(['/admin/admin-dashboard']);
    } else if (role === 'Sub-Admin') {
      this.router.navigate(['/admin/subadmin-dashboard']);
    } else if (role === 'Counselor') {
      this.router.navigate(['/admin/counselor-dashboard']);
    } else if (role === 'Counselor') {
      this.router.navigate(['/admin/student-issues-dashboard']);
    } 
    else {
      this.router.navigate(['/']);
    }
  }*/
}
