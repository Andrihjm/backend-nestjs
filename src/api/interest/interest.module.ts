import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { Interest, InterestSchema } from 'src/users/schemas/interest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interest.name, schema: InterestSchema },
    ]),
  ],
  controllers: [InterestController],
  providers: [InterestService],
})
export class InterestModule {}
