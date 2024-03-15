import { Module } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { ClientsModule, KafkaLogger, Transport } from '@nestjs/microservices';
import { AuthModuleController } from './auth-module.controller';
import { logLevel } from 'kafkajs';

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
          logLevel:logLevel.INFO,
          logCreator:KafkaLogger,
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
     },
  ]),
  ],
  providers: [AuthServiceService],
  controllers: [AuthModuleController]
})
export class AuthModuleModule {}
