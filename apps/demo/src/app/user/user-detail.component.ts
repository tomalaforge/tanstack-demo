import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { UserDetailStore } from './user-detail.store';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [],
  providers: [UserDetailStore],
  template: `
    <button class="btn mb-4 mx-auto" (click)="history.back()">Back</button>
    @if (userDetailStore.isLoading()) {
      <div>Loading...</div>
    } @else if (userDetailStore.isError()) {
      <div>Error: {{ userDetailStore.error() }}</div>
    } @else {
      <div>{{ userDetailStore.userDetail()?.name }}</div>
      <div>{{ userDetailStore.userDetail()?.age }}</div>
    }
  `,
  host: {
    class: 'block w-[500px] mx-auto p-10',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDetailComponent {
  userDetailStore = inject(UserDetailStore);
  // userService = inject(UserService);
  userId = input.required<number>();

  constructor() {
    effect(
      () => {
        this.userDetailStore.getUser(this.userId());
      },
      { allowSignalWrites: true },
    );
  }

  protected readonly history = history;
}
