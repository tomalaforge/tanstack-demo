import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserCreate, UserPage, UserUpdate } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getAllUsers() {
    return this.http.get<User[]>('/api/user/list');
  }

  getUserForPage(page: number) {
    return this.http.get<UserPage>(`/api/user/page?page=${page}&pageSize=10`);
  }

  getUserDetail(userId: number) {
    return this.http.get<User>(`/api/user/detail/${userId}`);
  }

  createUser(user: UserCreate) {
    return this.http.post('/api/user', user);
  }

  updateUser(userId: number, user: UserUpdate) {
    return this.http.put(`/api/user/${userId}`, user);
  }
}
