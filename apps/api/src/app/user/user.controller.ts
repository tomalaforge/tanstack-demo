import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreate } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserCreate) {
    return this.userService.create(user);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }
}
