import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

@Controller('events')
export class EventsController {
  @Get()
  findAll(): string {
    return 'Bye';
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return id;
  }

  @Post()
  createEvent(@Body() input: CreateEventDto) {
    return input;
  }

  @Patch(':id')
  updateEvent(@Param('id') id, @Body() input: UpdateEventDto) {
    return input;
  }

  @Delete(':id')
  @HttpCode(204)
  removeEvent(@Param('id') id): string {
    return 'Remove';
  }
}
