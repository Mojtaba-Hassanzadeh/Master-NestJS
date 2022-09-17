import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from './entities/attendee.entity';
import { AttendeesRepository } from './attendees.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attendee.name, schema: AttendeeSchema }]),
  ],
  providers: [AttendeesService, AttendeesRepository],
  controllers: [AttendeesController]
})
export class AttendeesModule {}
