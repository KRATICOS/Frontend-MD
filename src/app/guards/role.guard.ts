import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('User');

  if (!token || !userStr) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      localStorage.removeItem('token');
      localStorage.removeItem('User');
      router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data['role'] as string;

    const user = JSON.parse(userStr);
    const userRole = user.rol?.trim();

    if (userRole === expectedRole) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }

  } catch (error) {
    router.navigate(['/login']);
    return false;
  }
};
