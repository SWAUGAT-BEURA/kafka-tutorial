import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AppService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data:CreateUserDto): any{
    //save the user to the database and return the user with id
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    this.usersRepository.save(user);
    return user;
  }
  getUser(id:number): User{
    return this.usersRepository.findOne(id);
  }


  getHello(): string {
    return 'Hello World!';
  }
}
