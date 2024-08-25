import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      const isLoginPage = state.url === '/login';

      if (isAuthenticated) {
        // Redirect authenticated users away from the login page
        if (isLoginPage) {
          router.navigate(['/dashboard']); // or another route
          return false;
        }
        return true; // Allow access to the route
      } else {
        // Redirect unauthenticated users to the login page
        if (!isLoginPage) {
          router.navigate(['/login']); // Redirect to login if not authenticated
          return false;
        }
        return true; // Allow access to the login page
      }
    }),
    catchError(() => {
      router.navigate(['/login']); // Redirect to login on error
      return of(false); // Prevent access on error
    })
  );
};
