import { Injectable } from '@nestjs/common';
import { User, UserCreate, UserUpdate } from '../user/user.model';
import { incrementalNumber, randFirstName, randNumber } from '@ngneat/falso';

@Injectable()
export class FakeDBService {
  private factory = incrementalNumber();

  private generateUser = () => ({
    id: this.factory(),
    name: randFirstName(),
    age: randNumber({ min: 1, max: 100 }),
  });

  private fakeDB: User[] = Array.from({ length: 40 }, this.generateUser);

  create(user: UserCreate) {
    return this.fakeDB.unshift({ id: this.factory(), ...user });
  }

  findAll() {
    return this.fakeDB;
  }

  findUserPerPage(page: number, pageSize: number) {
    const start = page * pageSize;
    const end = start + pageSize;
    return [...this.fakeDB.slice(start, end)];
  }

  findOne(id: number) {
    return this.fakeDB.find((user) => user.id === id);
  }

  update(id: number, user: UserUpdate) {
    const userIndex = this.fakeDB.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.fakeDB[userIndex] = { id, ...this.fakeDB[userIndex], ...user };
    return this.fakeDB[userIndex];
  }
}
