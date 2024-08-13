import { Module } from '@nestjs/common';
import {AuthService} from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';  // Import DatabaseModule

@Module({
  imports: [
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '60m' },
    }),
    DatabaseModule,  // Import DatabaseModule to use DATABASE_CONNECTION
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
