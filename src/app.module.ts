import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { ProfileModule } from './api/profile/profile.module';
import { InterestModule } from './api/interest/interest.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: 'youapp_db',
    }),
    AuthModule,
    ProfileModule,
    InterestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
