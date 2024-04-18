import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPage } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUserForPage(page: number) {
    return this.http.get<UserPage>(`/api/user/page?page=${page}&pageSize=10`);
  }
}
