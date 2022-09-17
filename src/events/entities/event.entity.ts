import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsString, Length } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type EventDocument = Event & Document;
@Schema()
export class Event {
  @Prop()
  _id: string;

  @Prop()
  @IsString()
  @Length(5, 255, { message: 'The name lenght is wrong' })
  name: string;

  @Prop()
  @Length(5, 255)
  description: string;

  @Prop()
  @IsDateString()
  when: Date;

  @Prop()
  @Length(5, 255)
  address: string;
  
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }] })
  // attendees: Attendee[]
}

export const EventSchema = SchemaFactory.createForClass(Event);
