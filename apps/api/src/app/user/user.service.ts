import { Injectable } from '@nestjs/common';
import { FakeDBService } from '../db/fake-db.service';
import { UserCreate, UserUpdate } from './user.model';

@Injectable()
export class UserService {
  constructor(private db: FakeDBService) {}

  create(user: UserCreate) {
    return this.db.create(user);
  }

  findAll() {
    return this.db.findAll();
  }

  findUserPerPage(page: number, pageSize: number) {
    return {
      users: this.db.findUserPerPage(page, pageSize),
      hasMore: this.db.findAll().length > (page + 1) * pageSize,
    };
  }

  findOne(id: number) {
    return this.db.findOne(id);
  }

  update(id: number, user: UserUpdate) {
    return this.db.update(id, user);
  }
}
