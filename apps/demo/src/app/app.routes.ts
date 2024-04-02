import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./user/user.component') },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
];
