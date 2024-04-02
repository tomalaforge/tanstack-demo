import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectUsers } from './user.query';
import { AddUserComponent } from './add-user.dialog';

@Component({
  selector: 'user',
  standalone: true,
  imports: [AddUserComponent],
  template: `
    <button class="btn mb-4" (click)="addUser.showModal()">Add User</button>
    @if (queryUsers.isLoading()) {
      <div>Loading...</div>
    } @else if (queryUsers.isError()) {
      <div>Error: {{ queryUsers.error() }}</div>
    } @else {
      <ul class="flex flex-col gap-2">
        @for (user of queryUsers.data(); track user.id) {
          <li class="border p-4 border-base-200 rounded-sm">{{ user.name }}</li>
        }
      </ul>
    }

    <dialog #addUser class="modal">
      @defer (when addUser.open) {
        <add-user (close)="addUser.close()" />
      }
    </dialog>
  `,
  host: {
    class: 'block w-full h-screen p-10',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {
  queryUsers = injectUsers();
}
