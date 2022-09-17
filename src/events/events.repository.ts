import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEventDto } from "./dtos/create-event.dto";
import { v4 as uuidv4 } from 'uuid';
import { Event } from "./entities/event.entity";
import { UpdateEventDto } from "./dtos/update-event.dto";

@Injectable()
export class EventsRepository {
  constructor(
    @InjectModel(Event.name)
    private readonly eventsModel: Model<Event>,
  ) {
  }

  async findAll(): Promise<Event[]> {
    const events = await this.eventsModel.find();
    return events || [];
  }

  async findOne(id: string): Promise<Event | null | undefined> {
    const event = await this.eventsModel.findById(id).exec();
    return event;
  }

  async create(input: CreateEventDto): Promise<Event> {
    const uuid = uuidv4();
    const newEvent = new this.eventsModel(input);
    newEvent.when = new Date(input.when);
    newEvent._id = uuid;
    await newEvent.save();
    return newEvent;
  }

  async update(id: string, input: UpdateEventDto): Promise<Event | null | undefined> {
    const event = await this.eventsModel
      .findByIdAndUpdate(
        id,
        { ...input, when: input.when ? new Date(input.when) : undefined },
        { new: true },
      )
      .exec();
    return event;
  }

  async delete(id: string): Promise<Event | null | undefined> {
    const event = await this.eventsModel.findByIdAndDelete(id).exec();
    return event
  }

}