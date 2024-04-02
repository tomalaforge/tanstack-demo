import { Injectable } from '@nestjs/common';
import { FakeDBService } from '../db/fake-db.service';
import { UserCreate } from './user.model';

@Injectable()
export class UserService {
  constructor(private db: FakeDBService) {
  }

  create(user: UserCreate) {
    return this.db.create(user);
  }

  findAll() {
    return this.db.findAll();
  }


}
