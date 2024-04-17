import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { injectUserDetail } from './user.query';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [],
  template: `
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
    class: 'block w-full h-screen p-10',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDetailComponent {
  userId = input.required<number>();

  userDetailQuery = injectUserDetail(this.userId);
}
