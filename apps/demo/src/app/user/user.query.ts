import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { inject } from '@angular/core';
import { UserCreate } from './user.model';

export const userKeyFactory = {
  allUsers: () => ['users', 'list'],
};

export const injectUsers = () => {
  const userService = inject(UserService);
  return injectQuery(() => ({
    queryKey: userKeyFactory.allUsers(),
    queryFn: () => lastValueFrom(userService.getAllUsers()),
  }));
};

export const injectCreateUser = () => {
  const userService = inject(UserService);
  return injectMutation((client: QueryClient) => ({
    mutationFn: (userCreate: UserCreate) =>
      lastValueFrom(userService.createUser(userCreate)),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: userKeyFactory.allUsers() });
      // await user.refetchQueries({ queryKey: userKeyFactory.allusers() });
    },
  }));
};
