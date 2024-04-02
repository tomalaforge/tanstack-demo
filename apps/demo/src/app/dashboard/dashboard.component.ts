import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [],
  template: ` <div>Dashboard works!</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
