import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from './user.model';
import { UserStore } from './user.store';

@Component({
  selector: 'upsert-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="modal-box">
      <form class="absolute right-2 top-2" method="dialog">
        <button class="btn btn-sm btn-circle">✕</button>
      </form>
      <h3 class="font-bold text-lg">Hello!</h3>
      <form
        [formGroup]="form"
        class="flex flex-col gap-2"
        (ngSubmit)="addUser()"
      >
        <input
          type="text"
          formControlName="name"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          formControlName="age"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <button class="btn" type="submit">
          @if (userStore.isLoading()) {
            <span class="animate-ping">🔥</span>
          }
          Add User
        </button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertUserComponent {
  userStore = inject(UserStore);
  // userService = inject(UserService);

  close = output();
  user = input.required<User | undefined>();
  userId = computed(() => this.user()?.id);
  isEditing = computed(() => this.user() !== undefined);

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    age: new FormControl(0, { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      if (this.isEditing()) {
        this.form.patchValue(this.user()!);
      }
    });

    effect(() => {
      if (this.userStore.isLoading()) {
        this.close.emit();
        this.form.reset({ name: '', age: 0 });
      }
    });
  }

  addUser() {
    if (this.form.invalid) {
      return;
    }
    if (this.isEditing()) {
      this.userStore.updateUser(this.userId()!, this.form.getRawValue());
    } else {
      this.userStore.createUser(this.form.getRawValue());
    }
  }
}
