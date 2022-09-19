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
import { LazyModuleLoader } from '@nestjs/core';
import { EventsService } from './events.service';

@Controller('events')
@Injectable()
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    private readonly eventsService: EventsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  @Get()
  async findAll() {
    this.logger.log('Hit the findAll route');
    const events = await this.eventsService.findAll();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const event = await this.eventsService.findById(id);
    // const uuid = uuidv4();
    // const newAttendee = new this.attendeeModel()
    // newAttendee._id = uuid
    // newAttendee.name = 'Jeery';
    // // newAttendee.event = event
    // await newAttendee.save();
    return event;
  }

  @Post()
  async createEvent(@Body() input: CreateEventDto) {
    const newEvent = await this.eventsService.createEvent(input);
    return newEvent;
  }

  @Patch(':id')
  async updateEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateEventDto,
  ) {
    const event = await this.eventsService.updateEvent(id, input);
    return event;
  }

  @Delete(':id')
  @HttpCode(204)
  async removeEvent(@Param('id', ParseUUIDPipe) id: string) {
    const event = await this.eventsService.deleteEvent(id);
    return event;
  }
}
