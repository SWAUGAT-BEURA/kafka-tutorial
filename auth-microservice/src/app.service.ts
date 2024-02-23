import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AppService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data:CreateUserDto): void{
    this.usersRepository.save(data);
  }
  getUser(id:number): User{
    return this.usersRepository.findOne(id);
  }


  getHello(): string {
    return 'Hello World!';
  }
}
