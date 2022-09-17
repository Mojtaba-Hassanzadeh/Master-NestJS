import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString, Length } from "class-validator";
import { Document } from "mongoose";

export type AttendeeDocument = Attendee & Document;
@Schema()
export class Attendee {
  @Prop()
  _id: string;

  @Prop()
  @IsString()
  @Length(5, 255, { message: 'The name lenght is wrong' })
  name: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' , required: true})
  // event: Event;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);