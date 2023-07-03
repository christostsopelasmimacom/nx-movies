import { Movie } from 'shared-types';
import React from 'react';

interface MovieListProps {
    movies: Movie[];
}

const MovieCard = ({ movie }: { movie: Movie }) => (
    <div className="flex bg-dark-yellow flex-col border border-gray-300 rounded-lg max-w-md text-white">
        {movie.thumbnail && (
            <img
                className="w-full h-auto object-cover rounded-lg"
                src={movie.thumbnail}
                alt={movie.title}
                width={movie.thumbnail_width}
                height={movie.thumbnail_height}
            />
        )}
        <div className="mt-4 px-4">
            <h3 className="text-2xl font-bold">
                {movie.title} ({movie.year})
            </h3>
            <p className="text-base mt-2">Cast: {movie.cast.join(', ')}</p>
            <div className="flex mt-2">
                {movie.genres.map((genre, key) => (
                    <div key={key} className="rounded-lg px-3 py-1 bg-blue-600 mr-2">
                        {genre}
                    </div>
                ))}
            </div>
            {movie.extract && <p className="mt-2">{movie.extract}</p>}
            {movie.href && (
                <a
                    className="mt-2 text-blue-500 text-sm hover:underline"
                    href={movie.href}
                >
                    More Info
                </a>
            )}
        </div>
    </div>
);

export const MoviesList = ({ movies }: MovieListProps) => (
    <div className="flex justify-evenly gap-6 flex-wrap p-4">
        {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
        ))}
    </div>
);
