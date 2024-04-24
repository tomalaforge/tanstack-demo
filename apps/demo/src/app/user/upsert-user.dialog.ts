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
import { User, UserCreate, UserUpdate } from './user.model';
import { UserService } from './user.service';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

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
          @if (userCreateQuery.isPending() || userUpdateQuery.isPending()) {
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
  private userService = inject(UserService);

  userCreateQuery = injectMutation((client: QueryClient) => ({
    mutationFn: (user: UserCreate) =>
      lastValueFrom(this.userService.createUser(user)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users', 'list'] });
    },
  }));

  userUpdateQuery = injectMutation((client: QueryClient) => ({
    mutationFn: ({ userId, user }: { userId: number; user: UserUpdate }) =>
      lastValueFrom(this.userService.updateUser(userId, user)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users', 'list'] });
      client.invalidateQueries({
        queryKey: ['users', 'detail', this.userId()],
      });
    },
  }));

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
      if (
        this.userCreateQuery.isSuccess() ||
        this.userUpdateQuery.isSuccess()
      ) {
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
      this.userUpdateQuery.mutate({
        userId: this.userId()!,
        user: this.form.getRawValue(),
      });
    } else {
      this.userCreateQuery.mutate(this.form.getRawValue());
    }
  }
}
