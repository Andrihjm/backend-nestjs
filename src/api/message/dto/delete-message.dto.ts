import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class DeleteMessageDto {
  @IsNotEmpty()
  @IsString()
  messageId: string;

  @IsNotEmpty()
  @IsBoolean()
  deleted: boolean;
}
