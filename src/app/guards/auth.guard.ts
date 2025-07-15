import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Validar si el token está expirado
  const payload = JSON.parse(atob(token.split('.')[1]));
  const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos

  if (payload.exp && payload.exp < now) {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
