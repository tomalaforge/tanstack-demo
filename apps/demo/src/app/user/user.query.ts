import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { inject, Signal } from '@angular/core';
import { UserCreate, UserUpdate } from './user.model';

export const injectUsers = () => {
  const userService = inject(UserService);
  return injectQuery(() => ({
    queryKey: ['users', 'list'],
    queryFn: () => lastValueFrom(userService.getAllUsers()),
  }));
};

export const injectUserDetail = (userId: Signal<number>) => {
  const userService = inject(UserService);
  return injectQuery(() => ({
    queryKey: ['users', 'detail', userId()],
    queryFn: () => lastValueFrom(userService.getUserDetail(userId())),
  }));
};

export const injectCreateUser = () => {
  const userService = inject(UserService);
  return injectMutation((client: QueryClient) => ({
    mutationFn: (userCreate: UserCreate) =>
      lastValueFrom(userService.createUser(userCreate)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users', 'list'] });
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
        queryKey: ['users', 'list'],
      });
      client.invalidateQueries({
        queryKey: ['users', 'detail', userId()],
      });
    },
  }));
};
