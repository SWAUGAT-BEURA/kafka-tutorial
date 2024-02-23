import { Module } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModuleController } from './auth-module.controller';

@Module({
  imports: [
    ClientsModule.register([
     {
      name: 'AUTH_MICROSERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'auth',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-consumer-server',
        },
      },
     },
  ]),
  ],
  providers: [AuthServiceService],
  controllers: [AuthModuleController]
})
export class AuthModuleModule {}
