import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InterestDocument = Interest & Document;

@Schema()
export class Interest {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
