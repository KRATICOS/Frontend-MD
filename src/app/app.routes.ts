import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { roleGuard } from './guards/role.guard';


export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
    canActivate: [authGuard]
  },

  {
    path: 'tabs-Admin',
    loadChildren: () => import('./tabs-Admin/tabs-Admin.routes').then(m => m.routes),
    canActivate: [roleGuard],
    data: { role: 'admin' }
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage)
  },

  {
    path: 'reserva',
    loadComponent: () => import('./reserva/reserva.page').then(m => m.ReservaPage),
    canActivate: [authGuard]
  },
  {
    path: 'prestamo',
    loadComponent: () => import('./prestamo/prestamo.page').then(m => m.PrestamoPage),
    canActivate: [authGuard]
  },
  {
    path: 'editperfil',
    loadComponent: () => import('./editperfil/editperfil.page').then(m => m.EditperfilPage),
    canActivate: [authGuard]
  },

  {
    path: 'addAdmin',
    loadComponent: () => import('./addadmin/addadmin.page').then(m => m.AddadminPage),
    canActivate: [roleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'tabs-Admin/edit-material/:id',
    loadComponent: () => import('./edit-material/edit-material.page').then(m => m.EditMaterialPage),
    canActivate: [roleGuard],
    data: { role: 'admin' }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
