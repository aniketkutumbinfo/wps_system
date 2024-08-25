import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  getAuthToken(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.token || null;
      } catch (e) {
        console.error('Failed to parse user data:', e);
        return null;
      }
    }
    return null;
  }
  // Example method to check if a user is authenticated
  isAuthenticated(): Observable<boolean> {
    // Replace this with actual token validation logic
    // const userData = localStorage.getItem('userData');
    // Simple example: token should exist and be valid
    console.log(this.getAuthToken())
    return of(!!this.getAuthToken() && this.validateToken(this.getAuthToken()));
  }

  // Example method to validate the token
  private validateToken(token: any): boolean {
    // Implement actual token validation logic here
    // For example, decode the token and check its validity
    return true; // Placeholder
  }

  logout(): void {
    // Clear user data and token from local storage
    localStorage.removeItem('userData');
    // Implement any additional logout logic
  }
}
