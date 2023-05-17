import styles from './index.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Movie } from 'shared-types';

export const Index = ({
  q,
  movies: initialMovies,
}: {
  q: string;
  movies: Movie[];
}) => {
  const [search, setSearch] = useState('');
  const [movie, setMovie] = useState<Movie[]>(initialMovies);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${escape(search)}`)
      .then((resp) => resp.json())
      .then((data) => setMovie(data));
  }, [search]);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );

  return (
    <div className="page">
      <input
        className="search"
        value={search}
        onChange={onSetSearch}
        placeholder="Search movie..."
      />
      <MovieList movies={movie} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  let movies = [];
  if (context.query.q) {
    const res = await fetch(
      `http://localhost:3333/search?q=${escape(context.query.q)}`
    );
    movies = await res.json();
  }

  return {
    props: {
      q: context.query.q ?? '',
      movies,
    },
  };
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => (
  <div className="movie-list">
    {movies.map((movie, index) => (
      <div className="movie-card" key={index}>
        {movie.thumbnail && (
          <img
            className="movie-thumbnail"
            src={movie.thumbnail}
            alt={movie.title}
            width={movie.thumbnail_width}
            height={movie.thumbnail_height}
          />
        )}
        <div className="movie-details">
          <h3 className="movie-title">{movie.title} ({movie.year})</h3>
          <p className="movie-cast">Cast: {movie.cast.join(', ')}</p>
          <p className="movie-genres">
            {movie.genres.map((genre, key) => (
              <div key={key} className="genre-tag">
                {genre}
              </div>
            ))}
          </p>
          {movie.extract && <p className="movie-extract">{movie.extract}</p>}
          {movie.href && (
            <a className="movie-link" href={movie.href}>
              More Info
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default Index;
