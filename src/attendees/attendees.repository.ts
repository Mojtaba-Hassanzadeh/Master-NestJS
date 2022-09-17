import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { CreateAttendeeDto } from "./dtos/create-attendee.dto";
import { UpdateAttendeeDto } from "./dtos/update-attendee.dto";
import { Attendee } from "./entities/attendee.entity";

@Injectable()
export class AttendeesRepository {
  constructor(
    @InjectModel(Attendee.name)
    private readonly attendeesModel: Model<Attendee>,
  ) {
  }

  async findAll(): Promise<Attendee[]> {
    const attendees = await this.attendeesModel.find();
    return attendees || [];
  }

  async findOne(id: string): Promise<Attendee | null | undefined> {
    const attendee = await this.attendeesModel.findById(id).exec();
    return attendee;
  }

  async create(input: CreateAttendeeDto): Promise<Attendee> {
    const uuid = uuidv4();
    const newAttendee = new this.attendeesModel(input);
    newAttendee._id = uuid;
    await newAttendee.save();
    return newAttendee;
  }

  async update(id: string, input: UpdateAttendeeDto): Promise<Attendee | null | undefined> {
    const attendee = await this.attendeesModel
      .findByIdAndUpdate(
        id,
        input,
        { new: true },
      )
      .exec();
    return attendee;
  }

  async delete(id: string): Promise<Attendee | null | undefined> {
    const attendee = await this.attendeesModel.findByIdAndDelete(id).exec();
    return attendee
  }

}