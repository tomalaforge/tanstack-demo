import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpsertUserComponent } from './upsert-user.dialog';
import { User } from './user.model';
import { UserStore } from './user.store';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterLink, UpsertUserComponent],
  providers: [UserStore],
  template: `
    <button class="btn mb-4 mx-auto" (click)="upsertUser.showModal()">
      Add User
    </button>
    @if (userStore.isLoading()) {
      <div>Loading...</div>
    } @else if (userStore.isError()) {
      <div>Error: {{ userStore.error() }}</div>
    } @else {
      <ul class="flex flex-col gap-2 max-h-[500px] overflow-scroll border p-2 ">
        @for (user of userStore.users(); track user.id) {
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
export default class UserComponent implements OnInit {
  userStore = inject(UserStore);

  selectedUser = signal<User | undefined>(undefined);

  ngOnInit(): void {
    this.userStore.init();
  }
}
