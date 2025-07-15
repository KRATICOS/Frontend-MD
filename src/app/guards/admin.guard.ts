import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('User');

  if (!token || !userStr) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // Decodificar token para verificar expiración
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      localStorage.removeItem('token');
      localStorage.removeItem('User');
      router.navigate(['/login']);
      return false;
    }

    // Verificar rol
    const user = JSON.parse(userStr);
    if (user.rol?.trim() === 'admin') {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }

  } catch (error) {
    // En caso de error en la decodificación o JSON.parse
    router.navigate(['/login']);
    return false;
  }
};
