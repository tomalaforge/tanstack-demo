import { Route } from '@angular/router';
import DashboardComponent from './dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    loadComponent: () => import('./shell.component'),
    children: [
      { path: 'users', loadComponent: () => import('./user/user.component') },
      {
        path: 'users-page',
        loadComponent: () => import('./pagination/user-pagination.component'),
      },
      {
        path: 'users/:userId',
        loadComponent: () => import('./user/user-detail.component'),
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];
