import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller()
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get('/movie')
    getMovies() {
        return this.moviesService.getMovies();
    }

    @Get('/search')
    searchMovies(@Query('q') query: string) {
        return this.moviesService.searchMovies(query);
    }
}