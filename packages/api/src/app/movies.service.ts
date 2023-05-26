import { Injectable } from '@nestjs/common';
import { movies } from '../movies';

@Injectable()
export class MoviesService {
    getMovies() {
        return movies;
    }

    searchMovies(query: string) {
        return movies.filter(({ title }) =>
            title.toLowerCase().includes(query.toLowerCase()),
        );
    }
}