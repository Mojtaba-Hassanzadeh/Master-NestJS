import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppDummy } from './app.dummy';
import { AppPersianService } from './app.persian.service';
import { AppService } from './app.service';
import mongoConfig from './config/mongo.config';
import { EventsModule } from './events/events.module';
import { AttendeesModule } from './attendees/attendees.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: mongoConfig,
    }),
    AuthModule,
    EventsModule,
    AttendeesModule,
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
