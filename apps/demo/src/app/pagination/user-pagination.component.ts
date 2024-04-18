import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { UserPaginationStore } from './user-pagination.store';

@Component({
  selector: 'user',
  standalone: true,
  providers: [UserPaginationStore],
  template: `
    @if (userStore.isLoading()) {
      <div>Loading...</div>
    } @else if (userStore.isError()) {
      <div>Error: {{ userStore.error() }}</div>
    } @else {
      <ul class="flex flex-col gap-2 max-h-[500px] overflow-scroll border p-2">
        @for (user of userStore.users(); track user.id) {
          <div
            class="border p-4 border-base-200 rounded-sm flex items-center justify-between w-full"
          >
            <div class="grow flex justify-start">
              {{ user.name }} - {{ user.age }}
            </div>
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
          [disabled]="!userStore.hasMore()"
        >
          @if (userStore.isLoading()) {
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
  userStore = inject(UserPaginationStore);
  page = signal(0);

  constructor() {
    effect(
      () => {
        this.userStore.getUserPerPage(this.page());
      },
      { allowSignalWrites: true },
    );
  }

  previousPage() {
    this.page.update((old) => Math.max(old - 1, 0));
  }

  nextPage() {
    this.page.update((old) => (this.userStore.hasMore() ? old + 1 : old));
  }
}
