import styles from './index.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Movie } from 'shared-types';
import { MoviesList } from '../components/MoviesList/MoviesList';
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
    <div className="bg-dark-blue w-full text-center min-h-screen">
      <input
        className="h-8 text-2xl my-4 mx-0 rounded-lg border-none text-center outline-none"
        value={search}
        onChange={onSetSearch}
        placeholder="Search movie..."
      />
      <MoviesList movies={movie} />
    </div>
  );
};

export async function getStaticProps(context: any) {
  let movies = [];
  if (context?.query?.q) {
    const res = await fetch(
      `http://localhost:3333/search?q=${escape(context.query.q)}`
    );
    movies = await res.json();
  }

  return {
    props: {
      q: context?.query?.q ?? '',
      movies,
    },
  };
}

export default Index;
