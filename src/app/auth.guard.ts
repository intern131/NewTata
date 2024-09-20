// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: any): boolean {
//     const currentUser = this.authService.getCurrentUser();

//     if (!currentUser) {
//       this.router.navigate(['/login']); // Redirect to login if not authenticated
//       return false;
//     }

//     const expectedRole = route.data.expectedRole;

//     if (currentUser.role !== expectedRole) {
//       this.router.navigate(['/login']); // Redirect to login if role does not match
//       return false;
//     }

//     return true; import { Injectable } from '@angular/core';
//     import { CanActivate, Router } from '@angular/router';
//     import { AuthService } from './auth.service';
    
//     @Injectable({
//       providedIn: 'root',
//     })
//     export class AuthGuard implements CanActivate {
//       constructor(private authService: AuthService, private router: Router) {}
    
//       canActivate(route: any): boolean {
//         const currentUser = this.authService.getCurrentUser();
    
//         if (!currentUser) {
//           this.router.navigate(['/login']); // Redirect to login if not authenticated
//           return false;
//         }
    
//         const expectedRole = route.data.expectedRole;
    
//         if (currentUser.role !== expectedRole) {
//           this.router.navigate(['/login']); // Redirect to login if role does not match
//           return false;
//         }
    
//         return true; // Allow navigation if authenticated and role matches
//       }
//     }
//     // Allow navigation if authenticated and role matches
//   }
// }




// Suggested code may be subject to a license. Learn more: ~LicenseLog:1746558303.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1564465932.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3654708323.

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

interface User {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean { 
    const currentUser = this.authService.getCurrentUser();

    // Check if the user is logged in
    if (!currentUser) {
      this.router.navigate(['/login']); 
      return false;
    }

    // Check if the user has the required role 
    const expectedRole = route.data['expectedRole'];
    if (currentUser.role !== expectedRole) {
      this.router.navigate(['/login']); 
      return false;
    }

    // User is authenticated and has the correct role
    return true; 
  }
}
