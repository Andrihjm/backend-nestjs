import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateInterestTypes } from 'src/types/index.types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
  constructor(private interestService: InterestService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createInterest(@Request() req, @Body() body: CreateInterestTypes) {
    if (!req.user._id) {
      throw new UnauthorizedException('User not properly authenticated');
    }

    return this.interestService.createInterest(req.user._id, body.name);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInterests(@Request() req) {
    if (!req.user._id) {
      throw new UnauthorizedException('User not properly authenticated');
    }

    return this.interestService.findByUserId(req.user._id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteInterest(@Request() req, @Param('id') id: string) {
    if (!req.user._id) {
      throw new UnauthorizedException('User not properly authenticated');
    }

    return this.interestService.deleteInterest(id, req.user._id);
  }
}
