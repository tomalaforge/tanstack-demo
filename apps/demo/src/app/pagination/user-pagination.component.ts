import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { injectUsersForPage, userKeyFactory } from './user.query';
import { RouterLink } from '@angular/router';
import { injectQueryClient } from '@tanstack/angular-query-experimental';
import { UserService } from './user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (queryUsers.isLoading()) {
      <div>Loading...</div>
    } @else if (queryUsers.isError()) {
      <div>Error: {{ queryUsers.error() }}</div>
    } @else {
      <ul class="flex flex-col gap-2 max-h-[500px] overflow-scroll border p-2">
        @for (user of queryUsers.data()?.users; track user.id) {
          <div
            class="border p-4 border-base-200 rounded-sm flex items-center justify-between w-full"
          >
            <button [routerLink]="[user.id]" class="grow flex justify-start">
              {{ user.name }} - {{ user.age }}
            </button>
          </div>
        }
      </ul>
      <div class="flex justify-between  mt-2">
        <button
          class="p-4 btn btn-active"
          (click)="previousPage()"
          [disabled]="page() === 0"
        >
          Previous Page
        </button>
        <button
          class="p-4 btn btn-active"
          (click)="nextPage()"
          [disabled]="
            queryUsers.isPlaceholderData() || !queryUsers.data()?.hasMore
          "
        >
          @if (queryUsers.isFetching()) {
            <span class="animate-ping">🔥</span>
          }
          Next Page
        </button>
      </div>
    }
  `,
  host: {
    class: 'block w-[500px] mx-auto p-10',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserPaginationComponent {
  page = signal(0);

  private queryClient = injectQueryClient();
  private queryService = inject(UserService);
  queryUsers = injectUsersForPage(this.page);

  constructor() {
    effect(() => {
      if (
        !this.queryUsers.isPlaceholderData() &&
        this.queryUsers.data()?.hasMore
      ) {
        this.queryClient.prefetchQuery({
          queryKey: userKeyFactory.allUsersForPage(this.page() + 1),
          queryFn: () =>
            lastValueFrom(this.queryService.getUserForPage(this.page() + 1)),
        });
      }
    });
  }

  previousPage() {
    this.page.update((old) => Math.max(old - 1, 0));
  }

  nextPage() {
    this.page.update((old) =>
      this.queryUsers.data()?.hasMore ? old + 1 : old,
    );
  }
}
