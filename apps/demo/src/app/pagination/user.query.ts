import { inject, Signal } from '@angular/core';
import { UserService } from './user.service';
import {
  injectQuery,
  keepPreviousData,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const userKeyFactory = {
  allUsersForPage: (page: number) => ['users', 'list', page],
};

export const injectUsersForPage = (page: Signal<number>) => {
  const userService = inject(UserService);
  return injectQuery(() => ({
    queryKey: userKeyFactory.allUsersForPage(page()),
    queryFn: () => lastValueFrom(userService.getUserForPage(page())),
    placeholderData: keepPreviousData,
  }));
};
