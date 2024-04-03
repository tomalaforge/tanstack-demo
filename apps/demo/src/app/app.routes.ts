import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    loadComponent: () => import('./shell.component'),
    children: [
      { path: 'users', loadComponent: () => import('./user/user.component') },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
      },
    ],
  },
];
