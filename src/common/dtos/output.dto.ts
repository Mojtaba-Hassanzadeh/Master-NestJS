import { HttpStatus } from '@nestjs/common';

export class CoreOutput {
  success: boolean;
  status?: HttpStatus = HttpStatus.OK;
  error?: string;
}
