import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'shell',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav class="flex justify-center gap-10 p-4">
      <button class="btn btn-accent" routerLink="/app/users">Basic</button>
      <button class="btn btn-accent" routerLink="/app/users-page">
        Pagination
      </button>
      <button class="btn btn-accent" routerLink="/app/dashboard">
        Dashboard
      </button>
    </nav>
    <router-outlet />
    <!--    <angular-query-devtools initialIsOpen />-->
  `,
  host: {
    class: 'block h-screen',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShellComponent {}
