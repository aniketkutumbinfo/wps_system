import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Checking authentication for URL:', state.url); // Log the URL

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      const isLoginPage = state.url === '/login';
      console.log('Is login page:', isLoginPage); // Log whether it's the login page

      if (isAuthenticated) {
        // Redirect authenticated users away from the login page
        if (isLoginPage) {
          console.log('Redirecting authenticated user from login to dashboard');
          router.navigate(['/dashboard']);
          return false;
        }
        return true; // Allow access to the route
      } else {
        // Redirect unauthenticated users to the login page
        if (!isLoginPage) {
          console.log('Redirecting unauthenticated user to login');
          router.navigate(['/login']);
          return false;
        }
        return true; // Allow access to the login page
      }
    }),
    catchError(err => {
      console.error('Error in auth guard:', err); // Log errors
      router.navigate(['/login']); // Redirect to login on error
      return of(false); // Prevent access on error
    })
  );
};
