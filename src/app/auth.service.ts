import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';

  // Store a fake token in localStorage
  storeToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  // Check if a token exists in localStorage (used to check if the user is authenticated)
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    return !!token;  // Return true if token exists
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  clearToken() {
    localStorage.removeItem('authToken');
  }

  // Log out the user by removing the token
  logout(): void {
    localStorage.removeItem(this.authTokenKey);

  }
}
