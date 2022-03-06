import type { NextPage, GetStaticProps } from 'next';
import React from 'react';
import Head from 'next/head';
import Card from '../components/Card';
import Modal from '../components/Modal';
import MoreInfo from '../components/MoreInfo';
import Nav from '../components/Nav';
import { getMovies } from '../api/getMovies';
import { Movie } from '../types';
import styles from '../styles/Home.module.css';
import useCurrentMovie from '../hooks/useCurrentMovie';
import useMovieFilter from '../hooks/useMovieFilter';
import MoreInfoSkeleton from '../components/MoreInfoSkeleton';

type Props = {
	movies: Movie[] | null;
	genres: string[];
};

const Home: NextPage<Props> = ({ movies, genres }) => {
	const { filtered, filterOnChange, customFilter } = useMovieFilter(
		movies,
		genres
	);
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
	const genres = new Set<string>();
	// alphabetize movies by title
	movies?.sort((a, b) => a.title.localeCompare(b.title));

	// pull genres from movies
	movies?.forEach(
		(movie) =>
			movie.genres.length &&
			movie.genres.forEach((genre) => genres.add(genre))
	);

	const alphabetizedGenres = Array.from(genres).sort((a, b) =>
		a.localeCompare(b)
	);
	// add an 'all genres' category, since it couldn't have been pulled from API
	alphabetizedGenres.unshift('All genres');

	return {
		props: {
			movies,
			genres: alphabetizedGenres
		},
		revalidate: 86400
	};
};

export default Home;
