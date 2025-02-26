import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interest, InterestDocument } from 'src/users/schemas/interest.schema';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest.name) private interestModel: Model<InterestDocument>,
  ) {}

  async createInterest(
    userId: Types.ObjectId | string,
    name: string,
  ): Promise<Interest> {
    const newInterest = new this.interestModel({
      userId: new Types.ObjectId(userId),
      name,
    });

    return newInterest.save();
  }

  async findByUserId(userId: Types.ObjectId | string): Promise<Interest[]> {
    return this.interestModel
      .find({ userId: new Types.ObjectId(userId) })
      .exec();
  }

  async deleteInterest(
    interestId: string,
    userId: Types.ObjectId | string,
  ): Promise<{ message: string }> {
    const interest = await this.interestModel.findById(interestId);

    if (!interest) {
      throw new NotFoundException('Interest not found');
    }

    // Make sure the user owns this interest
    if (interest.userId.toString() !== userId.toString()) {
      throw new UnauthorizedException('You can only delete your own interests');
    }

    await this.interestModel.findByIdAndDelete(interestId);

    return {
      message: 'Interest deleted successfully',
    };
  }
}
