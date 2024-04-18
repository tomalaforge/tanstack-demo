import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user.service';
import { catchError, EMPTY } from 'rxjs';
import { User } from '../user/user.model';

@Injectable()
export class UserPaginationStore {
  private userService = inject(UserService);

  users = signal<User[] | null>(null);
  hasMore = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  isLoading = computed(() => this.loading() || this.users() === null);
  isError = computed(() => this.error() !== null);

  getUserPerPage(page: number) {
    this.loading.set(true);
    this.userService
      .getUserForPage(page)
      .pipe(
        catchError((error) => {
          this.error.set(error.message);
          return EMPTY;
        }),
      )
      .subscribe((users) => {
        this.users.set(users.users);
        this.hasMore.set(users.hasMore);
        this.loading.set(false);
      });
  }
}
