import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { injectUsers } from './user.query';
import { RouterLink } from '@angular/router';
import { UpsertUserComponent } from './upsert-user.dialog';
import { User } from './user.model';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterLink, UpsertUserComponent],
  template: `
    <button class="btn mb-4 mx-auto" (click)="upsertUser.showModal()">
      Add User
    </button>
    @if (queryUsers.isLoading()) {
      <div>Loading...</div>
    } @else if (queryUsers.isError()) {
      <div>Error: {{ queryUsers.error() }}</div>
    } @else {
      <ul class="flex flex-col gap-2 max-h-[500px] overflow-scroll border p-2 ">
        @for (user of queryUsers.data(); track user.id) {
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
    }

    <dialog #upsertUser class="modal">
      @defer (when upsertUser.open) {
        <upsert-user (close)="upsertUser.close()" [user]="selectedUser()" />
      }
    </dialog>
  `,
  host: {
    class: 'block p-10 w-[500px] mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {
  page = signal(0);

  queryUsers = injectUsers();

  selectedUser = signal<User | undefined>(undefined);
}
