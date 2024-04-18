import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { catchError, EMPTY } from 'rxjs';

@Injectable()
export class UserDetailStore {
  private userService = inject(UserService);

  userDetail = signal<User | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  isLoading = computed(() => this.loading() || this.userDetail() === null);
  isError = computed(() => this.error() !== null);

  getUser(id: number) {
    this.loading.set(true);
    this.userService
      .getUserDetail(id)
      .pipe(
        catchError((error) => {
          this.error.set(error.message);
          return EMPTY;
        }),
      )
      .subscribe((user) => {
        this.userDetail.set(user);
        this.loading.set(false);
      });
  }
}
