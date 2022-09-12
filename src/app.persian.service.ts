import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppPersianService {
  constructor(
    @Inject('APP_NAME')
    private readonly name: string,
    @Inject('MESSAGE')
    private readonly message: string,
  ) {}
  getHello(): string {
    return `سلام عشق من! from ${this.name}, ${this.message}`;
  }
}
