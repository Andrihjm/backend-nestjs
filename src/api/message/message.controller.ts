import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Put,
  Delete,
  UnauthorizedException,
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

  @UseGuards(JwtAuthGuard)
  @Put(':messageId')
  async updateMessage(
    @Req() req,
    @Param('messageId') messageId: string,
    @Body('content') content: string,
  ) {
    return this.messageService.updateMessage(req.user._id, messageId, content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':messageId')
  async deleteMessageEndpoint(
    @Req() req,
    @Param('messageId') messageId: string,
  ) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const deletedMessage = await this.messageService.deleteMessage(
      req.user._id,
      messageId,
    );
    return {
      message: 'This message has been deleted.',
      deletedMessage,
    };
  }
}
