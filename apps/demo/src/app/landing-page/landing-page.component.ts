import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './hero.component';

@Component({
  selector: 'langing-page',
  standalone: true,
  imports: [RouterLink, HeroComponent],
  template: `
    <h1>Landing Page</h1>
    <hero />
    <button routerLink="/app/users" class="btn btn-accent">
      Connect to app
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LangingPageComponent {}
