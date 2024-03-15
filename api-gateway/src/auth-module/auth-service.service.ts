import { OnModuleInit, Inject, Injectable, Logger } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dto';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  private readonly logger = new Logger(AuthServiceService.name);
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-consumer' // Should be the same thing we give in consumer
      }
    }
  })
  client: ClientKafka;

//   constructor(
//     @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
//   ) {}

//   async onModuleInit() {
//     this.logger.log('Initializing AuthServiceService');
//     await this.authClient.connect();
//     this.authClient.subscribeToResponseOf('create-user.reply');

//   }
async onModuleInit() {
    this.client.subscribeToResponseOf('create-user');
    await this.client.connect();
}

  createUser(createUserDto: CreateUserDto) {
    this.logger.log(`Sending message to create-user topic: ${JSON.stringify(createUserDto)}`);
    return this.client.send('create-user', JSON.stringify(createUserDto)).toPromise();
  }

    //create get user from kafka sending the id
    getUser(id: string) {
        this.logger.log(`Sending message to get-user topic: ${id}`);
        return this.client.send('get-user', id).toPromise();
    }
}