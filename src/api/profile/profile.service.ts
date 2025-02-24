import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Profile,
  ProfileDocument,
} from 'src/users/schemas/user-profile.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { getHoroscope, getZodiac } from 'src/utils/date-utils';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async createProfile(
    userId: string,
    data: {
      image?: string;
      displayName: string;
      gender: string;
      birthday: string;
      height?: number;
      weight?: number;
    },
  ): Promise<Profile> {
    const birthDate = new Date(data.birthday);
    const { horoscope, zodiac } = this.getHoroscopeAndZodiac(data.birthday);

    const newProfile = new this.profileModel({
      userId,
      displayName: data.displayName,
      gender: data.gender,
      birthday: birthDate,
      horoscope,
      zodiac,
      height: data.height,
      weight: data.weight,
      image: data.image,
    });

    return newProfile.save();
  }

  async getProfileByUserId(userId: string): Promise<Profile> {
    return await this.profileModel
      .findOne({ userId })
      .populate('userId', '-password')
      .lean();
  }

  async updateProfileByUserId(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profileModel.findOneAndUpdate({ userId }, updateProfileDto, {
      new: true,
    });
  }

  private getHoroscopeAndZodiac(date: string) {
    const birth = new Date(date);
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    const year = birth.getFullYear();

    const zodiac = getZodiac(year);
    const horoscope = getHoroscope(month, day);

    return { horoscope, zodiac };
  }
}
