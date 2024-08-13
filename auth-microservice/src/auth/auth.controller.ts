import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @MessagePattern('validate-user')
//   async validateUser(@Payload() token: string) {
//     return this.authService.validateUser(token);
//   }

  @MessagePattern('login')
  async login(@Payload() user: any) {
    return this.authService.login(user);
  }

  @MessagePattern('register-user')
  async register(@Payload() createUserDto: CreateUserDto) {
    console.log('registering user');
    return this.authService.register(createUserDto);
  }
}
