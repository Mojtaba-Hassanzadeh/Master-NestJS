import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Injectable,
    Logger,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
  } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dtos/create-attendee.dto';
import { UpdateAttendeeDto } from './dtos/update-attendee.dto';
  
  @Controller('attendees')
  @Injectable()
  export class AttendeesController {
    private readonly logger = new Logger(AttendeesController.name);
    constructor(
      private readonly attendeesService: AttendeesService,
      private lazyModuleLoader: LazyModuleLoader
    ) {}
  
    @Get()
    async findAll() {
      this.logger.log('Hit the findAll route');
      const attendees = await this.attendeesService.findAll();
      this.logger.debug(`Found ${attendees.length} attendees`);
      return attendees;
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      const attendee = await this.attendeesService.findById(id);
      // const uuid = uuidv4();
      // const newAttendee = new this.attendeeModel()
      // newAttendee._id = uuid 
      // newAttendee.name = 'Jeery';
      // // newAttendee.attendee = attendee
      // await newAttendee.save();
      return attendee;
    }
  
    @Post()
    async createAttendee(@Body() input: CreateAttendeeDto) {
      const newAttendee = await this.attendeesService.createAttendee(input)
      return newAttendee;
    }
  
    @Patch(':id')
    async updateAttendee(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() input: UpdateAttendeeDto,
    ) {
      const attendee = await this.attendeesService.updateAttendee(id, input)
      return attendee;
    }
  
    @Delete(':id')
    @HttpCode(204)
    async removeAttendee(@Param('id', ParseUUIDPipe) id: string) {
      const attendee = await this.attendeesService.deleteAttendee(id);
      return attendee;
    }
  }
  