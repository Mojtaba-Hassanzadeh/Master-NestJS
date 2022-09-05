import { OmitType, PickType } from '@nestjs/mapped-types';
import { Event } from '../entities/event.entity';

export class CreateEventDto extends OmitType(Event, ['_id']) {}
