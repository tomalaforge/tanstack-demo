import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { UserDetailStore } from './user-detail.store';
import { UserService } from './user.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [],
  providers: [UserDetailStore],
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
  private userService = inject(UserService);
  userId = input.required<number>();

  userDetailQuery = injectQuery(() => ({
    queryKey: ['users', 'detail', this.userId()],
    queryFn: () => lastValueFrom(this.userService.getUserDetail(this.userId())),
    staleTime: 1000 * 60,
  }));

  protected readonly history = history;
}
