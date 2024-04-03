import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [],
  template: ` <div>Hero section</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
