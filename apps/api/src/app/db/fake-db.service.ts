import { Injectable } from '@nestjs/common';
import { User, UserCreate } from '../user/user.model';

@Injectable()
export class FakeDBService {
  private idCount = 2;

  private fakeDB: User[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 25,
    },
  ];

  create(user: UserCreate) {
    return this.fakeDB.push({ id: this.idCount++, ...user });
  }

  findAll() {
    return this.fakeDB;
  }
}
