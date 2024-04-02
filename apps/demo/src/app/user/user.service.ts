import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserCreate } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getAllUsers() {
    return this.http.get<User[]>('/api/user/list');
  }

  createUser(user: UserCreate) {
    return this.http.post('/api/user', user);
  }

}
