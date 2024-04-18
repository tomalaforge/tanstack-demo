import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { inject, Signal } from '@angular/core';
import { UserCreate, UserUpdate } from './user.model';

export const userKeyFactory = {
  allUsers: () => ['users', 'list'],
  userDetail: (userId: number) => ['users', 'detail', userId],
};

export const injectUsers = () => {
  const userService = inject(UserService);
  return injectQuery(() => ({
    queryKey: userKeyFactory.allUsers(),
    queryFn: () => lastValueFrom(userService.getAllUsers()),
  }));
};

export const injectUserDetail = (userId: Signal<number>) => {
  const userService = inject(UserService);
  return injectQuery(() => ({
    queryKey: userKeyFactory.userDetail(userId()),
    queryFn: () => lastValueFrom(userService.getUserDetail(userId())),
  }));
};

export const injectCreateUser = () => {
  const userService = inject(UserService);
  return injectMutation((client: QueryClient) => ({
    mutationFn: (userCreate: UserCreate) =>
      lastValueFrom(userService.createUser(userCreate)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: userKeyFactory.allUsers() });
    },
  }));
};

export const injectUpdateUser = (userId: Signal<number | undefined>) => {
  const userService = inject(UserService);
  return injectMutation((client: QueryClient) => ({
    mutationFn: (user: UserUpdate) =>
      lastValueFrom(userService.updateUser(userId()!, user)),
    enabled: userId() !== undefined,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['users'],
      });
    },
  }));
};
