import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  image: string;

  @Prop({ required: true })
  displayName: string;

  @Prop()
  gender: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
