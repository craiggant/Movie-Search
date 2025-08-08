import type { NextPage, GetStaticProps } from 'next';
import React from 'react';
import Head from 'next/head';
import Card from '../components/Card';
import Modal from '../components/Modal';
import MoreInfo from '../components/MoreInfo';
import Nav from '../components/Nav';
import { getGenres, getMovies } from '../helper/getMovies';
import { Genre, Movie, MovieWithGenreNames } from '../types';
import styles from '../styles/Home.module.css';
import useCurrentMovie from '../hooks/useCurrentMovie';
import useMovieFilter from '../hooks/useMovieFilter';
import MoreInfoSkeleton from '../components/MoreInfoSkeleton';

type Props = {
	movies: MovieWithGenreNames[];
	genres: Genre[];
};

const Home: NextPage<Props> = ({ movies, genres }) => {
	const { filtered, filterOnChange, customFilter } = useMovieFilter(movies);
	const { searchResults } = filtered;

	const { isActive, setIsActive, currentMovie, handleMovieClick } =
		useCurrentMovie();

	return (
		<>
			<Head>
				<title>Movie Search</title>
				<meta
					name="description"
					content="Find favorite movies by title or genre"
				/>
			</Head>
			<Nav
				filterOnChange={filterOnChange}
				customFilter={customFilter}
				options={genres}
			></Nav>
			<div className={styles.container}>
				<main className={styles.main}>
					<div className={styles.grid}>
						{searchResults?.length ? (
							searchResults.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									handleClick={handleMovieClick}
								/>
							))
						) : (
							<p className={styles.noResultsMessage}>
								We&apos;re sorry. There are no matches for your
								search.
							</p>
						)}
					</div>
					<Modal isActive={isActive} setIsActive={setIsActive}>
						{currentMovie.id ? (
							<MoreInfo currentMovie={currentMovie} />
						) : (
							<MoreInfoSkeleton />
						)}
					</Modal>
				</main>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const movies = await getMovies();
	const genres = await getGenres();
	const genreMap = new Map<number, string>();
	// iterate through genres and make a hash with id and name
	genres.forEach((genre) => genreMap.set(genre.id, genre.name));

	// Clean movies data to ensure no undefined values
	const cleanedMovies =
		movies.map((movie) => ({
			...movie,
			genres: movie.genre_ids.map((id) => genreMap.get(id) || '')
		})) || null;

	const alphabetizedMovies =
		cleanedMovies?.sort((a, b) => a.title.localeCompare(b.title)) || null;

	const alphabetizedGenres = Array.from(genres).sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	// add an 'all genres' category, since it couldn't have been pulled from API
	alphabetizedGenres.unshift({ id: 999999999999999, name: 'All Genres' });

	return {
		props: {
			movies: alphabetizedMovies,
			genres: alphabetizedGenres
		},
		revalidate: 259200 // regenerate the page every 72 hours
	};
};

export default Home;
