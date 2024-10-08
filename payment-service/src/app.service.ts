import { MakePaymentDto } from './dto';
import { Inject,Injectable,OnModuleInit } from '@nestjs/common';
import { User } from './entity';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const {userId,amount} = makePaymentDto;
    console.log('Processing payment for user', userId);
    this.authClient
      .send('get_user',JSON.stringify({userId}))
      .subscribe((user:User)=>{
        console.log(
          `process payment for user ${userId} with amount ${amount} and user details ${JSON.stringify(user)}`,
        );
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
