import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'shell',
  standalone: true,
  imports: [AngularQueryDevtools, RouterLink, RouterOutlet],
  template: `
    <nav>
      <button class="btn btn-accent" routerLink="/app/users">Users</button>
      <button class="btn btn-accent" routerLink="/app/dashboard">
        Dashboard
      </button>
    </nav>
    <router-outlet />
    <angular-query-devtools initialIsOpen />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShellComponent {}
