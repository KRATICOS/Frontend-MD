import { Routes } from '@angular/router';
import { TabsPage }  from './tabs.page';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivateChild: [authGuard],
    children: [
      { path: 'tab1',     loadComponent: () => import('../tab1/tab1.page').then(m => m.Tab1Page) },
      { path: 'tab2',     loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page) },
      { path: 'tab3',     loadComponent: () => import('../tab3/tab3.page').then(m => m.Tab3Page) },
      { path: 'reserva',  loadComponent: () => import('../reserva/reserva.page').then(m => m.ReservaPage) },
      { path: 'prestamo', loadComponent: () => import('../prestamo/prestamo.page').then(m => m.PrestamoPage) },
      { path: '', redirectTo: 'tab1', pathMatch: 'full' }
    ]
  }
];
