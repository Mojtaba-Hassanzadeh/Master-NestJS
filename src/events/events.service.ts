import { Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from '@nestjs/common';
import { AttendeesService } from '../attendees/attendees.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsRepository } from './events.repository';


@Injectable()
export class EventsService {
    constructor(
        private readonly eventsRepository: EventsRepository,
        @Inject(AttendeesService)
        private readonly attendeesService: AttendeesService
    ) {}

    async findAll(): Promise<Event[]> {
        try {
            const events = await this.eventsRepository.findAll();
            return events || [];
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
        
    }

    async findById(id: string): Promise<Event> {
        try {
            const event = await this.eventsRepository.findOne(id);
            if (!event) {
                throw new NotFoundException();
            }
            return event;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
        
    }

    async createEvent(input: CreateEventDto): Promise<Event> {
        try {
            if(input.attendees && input.attendees.length > 0) {
                // check attendee ids
                // update attendee event
            }
            const event = await this.eventsRepository.create(input);
            if (!event) {
                throw new NotFoundException();
            }
            return event;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
    }
    
    async updateEvent(id: string, input: UpdateEventDto): Promise<Event> {
        try {
            const event = await this.eventsRepository.update(id, input);
            if (!event) {
                throw new NotFoundException();
            }
            return event;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
    }

    async deleteEvent(id: string): Promise<Event> {
        try {
            const event = await this.eventsRepository.delete(id);
            if (!event) {
                throw new NotFoundException();
            }
            return event;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
    }
}
