import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { injectUserDetail } from './user.query';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [],
  template: `
    <button class="btn mb-4 mx-auto" (click)="history.back()">Back</button>
    @if (userDetailQuery.isLoading()) {
      <div>Loading...</div>
    } @else if (userDetailQuery.isError()) {
      <div>Error: {{ userDetailQuery.error() }}</div>
    } @else {
      <div>{{ userDetailQuery.data()?.name }}</div>
      <div>{{ userDetailQuery.data()?.age }}</div>
    }
  `,
  host: {
    class: 'block w-[500px] mx-auto p-10',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDetailComponent {
  userId = input.required<number>();

  userDetailQuery = injectUserDetail(this.userId);

  protected readonly history = history;
}
