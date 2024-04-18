import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserCreate, UserUpdate } from './user.model';
import { UserService } from './user.service';
import { catchError, EMPTY } from 'rxjs';

@Injectable()
export class UserStore {
  private userService = inject(UserService);

  users = signal<User[] | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  isLoading = computed(() => this.loading() || this.users() === null);
  isError = computed(() => this.error() !== null);

  init() {
    this.loading.set(true);
    this.userService
      .getAllUsers()
      .pipe(
        catchError((error) => {
          this.error.set(error.message);
          return EMPTY;
        }),
      )
      .subscribe((users) => {
        this.users.set(users);
        this.loading.set(false);
      });
  }

  updateUser(userId: number, user: UserUpdate) {
    this.loading.set(true);
    this.userService
      .updateUser(userId, user)
      .pipe(
        catchError((error) => {
          this.error.set(error.message);
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.init();
        this.loading.set(false);
      });
  }

  createUser(user: UserCreate) {
    this.loading.set(true);
    this.userService
      .createUser(user)
      .pipe(
        catchError((error) => {
          this.error.set(error.message);
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.init();
        this.loading.set(false);
      });
  }
}
