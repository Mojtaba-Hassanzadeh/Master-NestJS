import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;
@Schema()
export class Event {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  when: Date;

  @Prop()
  address: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
