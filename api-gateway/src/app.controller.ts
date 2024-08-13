import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('register-user');
    this.kafkaClient.subscribeToResponseOf('validate-user');
    this.kafkaClient.subscribeToResponseOf('login');
    await this.kafkaClient.connect();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('registering user');
    return this.kafkaClient.send('register-user', createUserDto);
  }

  @Post('login')
  async login(@Body() user: any) {
    console.log('logging in user');
    return this.kafkaClient.send('login', user);
  }
}
