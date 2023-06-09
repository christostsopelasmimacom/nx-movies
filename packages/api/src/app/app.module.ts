import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesService } from './movies.service';
import {MoviesController} from "./movies.controller";

@Module({
  imports: [],
  controllers: [AppController, MoviesController],
  providers: [AppService, MoviesService],
})
export class AppModule {}
