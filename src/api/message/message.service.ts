import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from 'src/users/schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async sendMessage(
    senderId: string,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const { receiverId, content } = createMessageDto;

    const message = new this.messageModel({
      senderId,
      receiverId,
      content,
    });

    return await message.save();
  }

  async getMessages(userId: string, receiverId: string) {
    return this.messageModel
      .find({
        $or: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      })
      .sort({ createdAt: 1 })
      .lean();
  }
}
