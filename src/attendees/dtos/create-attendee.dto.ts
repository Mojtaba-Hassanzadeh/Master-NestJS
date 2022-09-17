import { OmitType } from '@nestjs/mapped-types';
import { Attendee } from '../entities/attendee.entity';

export class CreateAttendeeDto extends OmitType(Attendee, ['_id']) {}