import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-message')
  async sendMessage(@Req() req, @Body() createMessageDto: CreateMessageDto) {
    const senderId = req.user._id;
    return await this.messageService.sendMessage(senderId, createMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':receiverId')
  async getMessages(@Req() req, @Param('receiverId') receiverId: string) {
    const userId = req.user._id;
    return await this.messageService.getMessages(userId, receiverId);
  }
}
