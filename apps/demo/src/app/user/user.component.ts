import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { injectUsersForPage } from './user.query';
import { RouterLink } from '@angular/router';
import { UpsertUserComponent } from './upsert-user.dialog';
import { User } from './user.model';
import { injectQueryClient } from '@tanstack/angular-query-experimental';
import { UserService } from './user.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterLink, UpsertUserComponent],
  template: `
    <button class="btn mb-4" (click)="upsertUser.showModal()">Add User</button>
    @if (queryUsers.isLoading()) {
      <div>Loading...</div>
    } @else if (queryUsers.isError()) {
      <div>Error: {{ queryUsers.error() }}</div>
    } @else {
      <ul
        class="flex flex-col gap-2 max-h-[500px] overflow-scroll border p-2 w-[500px]"
      >
        @for (user of queryUsers.data()?.users; track user.id) {
          <div
            class="border p-4 border-base-200 rounded-sm flex items-center justify-between w-full"
          >
            <button [routerLink]="[user.id]" class="grow flex justify-start">
              {{ user.name }} - {{ user.age }}
            </button>
            <button
              class="btn"
              type="button"
              (click)="selectedUser.set(user); upsertUser.showModal()"
            >
              Edit
            </button>
          </div>
        }
      </ul>
      <div class="flex justify-between w-[500px] mt-2">
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

    <dialog #upsertUser class="modal">
      @defer (when upsertUser.open) {
        <upsert-user (close)="upsertUser.close()" [user]="selectedUser()" />
      }
    </dialog>
  `,
  host: {
    class: 'block w-full p-10',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {
  page = signal(0);

  // queryUsers = injectUsers();

  private queryClient = injectQueryClient();
  private queryService = inject(UserService);
  queryUsers = injectUsersForPage(this.page);

  selectedUser = signal<User | undefined>(undefined);

  constructor() {
    effect(() => {
      // if (
      //   !this.queryUsers.isPlaceholderData() &&
      //   this.queryUsers.data()?.hasMore
      // ) {
      //   this.queryClient.prefetchQuery({
      //     queryKey: userKeyFactory.allUsersForPage(this.page() + 1),
      //     queryFn: () =>
      //       lastValueFrom(this.queryService.getUserForPage(this.page() + 1)),
      //   });
      // }
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
