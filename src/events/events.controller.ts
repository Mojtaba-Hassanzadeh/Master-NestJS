import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Injectable,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Event, EventDocument } from './entities/event.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller('events')
@Injectable()
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @Get()
  async findAll() {
    this.logger.log('Hit the findAll route');
    const events = await this.eventModel.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Post()
  async createEvent(@Body() input: CreateEventDto) {
    const uuid = uuidv4();
    const newEvent = new this.eventModel(input);
    newEvent.when = new Date(input.when);
    newEvent._id = uuid;
    await newEvent.save();
    return newEvent;
  }

  @Patch(':id')
  async updateEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateEventDto,
  ) {
    const event = await this.eventModel
      .findByIdAndUpdate(
        id,
        { ...input, when: input.when ? new Date(input.when) : undefined },
        { new: true },
      )
      .exec();
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Delete(':id')
  @HttpCode(204)
  async removeEvent(@Param('id', ParseUUIDPipe) id: string) {
    const event = await this.eventModel.findByIdAndDelete(id).exec();
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }
}
