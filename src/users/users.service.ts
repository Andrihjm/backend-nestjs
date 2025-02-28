import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserTypes } from 'src/types/user.types';
import { User, UserDocument } from './schemas/user.schema';
import { hashPassword } from 'src/utils/hash-password.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async create({ email, username, password }: CreateUserTypes): Promise<User> {
    const hashedPassword = await hashPassword(password);
    const createdUser = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }
}
