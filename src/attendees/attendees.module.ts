import { Module, forwardRef } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendee, AttendeeSchema } from './entities/attendee.entity';
import { AttendeesRepository } from './attendees.repository';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attendee.name, schema: AttendeeSchema }]),
    // forwardRef(() => EventsModule)
  ],
  providers: [AttendeesService, AttendeesRepository],
  controllers: [AttendeesController],
  exports: [AttendeesService, MongooseModule]
})
export class AttendeesModule {}
