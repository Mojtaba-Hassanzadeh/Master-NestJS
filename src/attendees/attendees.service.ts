import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AttendeesRepository } from './attendees.repository';
import { CreateAttendeeDto } from './dtos/create-attendee.dto';
import { UpdateAttendeeDto } from './dtos/update-attendee.dto';
import { Attendee } from './entities/attendee.entity';


@Injectable()
export class AttendeesService {
    constructor(
        private readonly attendeesRepository: AttendeesRepository
    ) {}

    async findAll(): Promise<Attendee[]> {
        try {
            const attendees = await this.attendeesRepository.findAll();
            return attendees || [];
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
        
    }

    async findById(id: string): Promise<Attendee> {
        try {
            const attendee = await this.attendeesRepository.findOne(id);
            if (!attendee) {
                throw new NotFoundException();
            }
            return attendee;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
        
    }

    async createAttendee(input: CreateAttendeeDto): Promise<Attendee> {
        try {
            const attendee = await this.attendeesRepository.create(input);
            if (!attendee) {
                throw new NotFoundException();
            }
            return attendee;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
    }
    
    async updateAttendee(id: string, input: UpdateAttendeeDto): Promise<Attendee> {
        try {
            const attendee = await this.attendeesRepository.update(id, input);
            if (!attendee) {
                throw new NotFoundException();
            }
            return attendee;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
    }

    async deleteAttendee(id: string): Promise<Attendee> {
        try {
            const attendee = await this.attendeesRepository.delete(id);
            if (!attendee) {
                throw new NotFoundException();
            }
            return attendee;
        } catch (error) {
            throw new InternalServerErrorException(error)
        };
    }
}
