import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppDummy } from './app.dummy';
import { AppPersianService } from './app.persian.service';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-events'),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppPersianService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest Events Backend',
    },
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: (app) => `${app.dummy()} Factory!`,
    },
    AppDummy,
  ],
})
export class AppModule {}
