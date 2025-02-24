import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileTypes } from 'src/types/user.types';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createProfile(@Request() req, @Body() body: CreateProfileTypes) {
    if (!req.user._id) {
      throw new UnauthorizedException('User not properly authenticated');
    }

    return this.profileService.createProfile(req.user._id.toString(), body);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    if (!req.user._id) {
      throw new UnauthorizedException('User not properly authenticated');
    }

    return this.profileService.getProfileByUserId(req.user._id.toString());
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    if (!req.user._id) {
      throw new UnauthorizedException('User not properly authenticated');
    }

    return this.profileService.updateProfileByUserId(
      req.user._id.toString(),
      updateProfileDto,
    );
  }
}
