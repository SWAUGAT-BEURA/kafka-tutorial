import { Controller, Get ,ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/.dto';
import { EventPattern,MessagePattern,Payload } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) data:CreateUserDto){
    this.appService.createUser(data);
  }
  @MessagePattern('get_user')
  handleGetUser(@Payload(ParseIntPipe) userId:number){
    return this.appService.getUser(userId);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
