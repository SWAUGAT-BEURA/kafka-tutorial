import { Controller, Get ,ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EventPattern,MessagePattern,Payload } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create-user')
async handleUserCreate(@Payload(ValidationPipe) data:CreateUserDto){
  console.log('data',data);
  return this.appService.createUser(data);
}

  @MessagePattern('get-user')
  handleGetUser(@Payload(ParseIntPipe) userId:number){
    return this.appService.getUser(userId);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
