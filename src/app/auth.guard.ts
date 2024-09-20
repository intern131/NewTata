import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }

    const expectedRole = route.data.expectedRole;

    if (currentUser.role !== expectedRole) {
      this.router.navigate(['/login']); // Redirect to login if role does not match
      return false;
    }

    return true;
  }
}