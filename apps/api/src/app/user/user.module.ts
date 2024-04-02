import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FakeDBService } from '../db/fake-db.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FakeDBService],
})
export class UserModule {}
