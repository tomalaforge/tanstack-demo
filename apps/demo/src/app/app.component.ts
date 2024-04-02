import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';

@Component({
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools, RouterLink],
  selector: 'app-root',
  template: `
    <nav>
      <button class="btn btn-accent" routerLink="/users">Users</button>
      <button class="btn btn-accent" routerLink="/dashboard">Dashboard</button>
    </nav>
    <router-outlet />
    <angular-query-devtools initialIsOpen />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
