import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hashPassword } from 'src/utils/hash-password.util';
import { CreateUserTypes } from 'src/types/user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async createUser({ email, password }: CreateUserTypes): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email,
    });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }
}
