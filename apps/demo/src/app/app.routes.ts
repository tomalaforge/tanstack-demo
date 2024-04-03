import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./landing-page/landing-page.component'),
  },
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
