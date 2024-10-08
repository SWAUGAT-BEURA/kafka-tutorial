import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const client = new MongoClient("mongodb+srv://test-user:ctLcM0sJ0SAgBe6L@cluster0.iaky75d.mongodb.net");
        await client.connect();
        return client.db('authorization-service');
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class AppModule {}
