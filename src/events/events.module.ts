import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeesModule } from '../attendees/attendees.module';
import { Event, EventSchema } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    AttendeesModule
    // forwardRef(() => AttendeesModule)
  ],
  providers: [EventsService, EventsRepository, EventsController],
  controllers: [EventsController],
  exports: [EventsService, MongooseModule]
  
})
export class EventsModule {}
