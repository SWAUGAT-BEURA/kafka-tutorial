import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModuleModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
