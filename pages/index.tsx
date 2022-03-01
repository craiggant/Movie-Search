import type { NextPage, GetServerSideProps } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/Input';
import MoreInfo from '../components/MoreInfo';
import { getMovies, getMovieById } from '../api/getMovies';
import { Movie, FullMovieInfo } from '../types';
import styles from '../styles/Home.module.css';
import useMovieFilter from '../hooks/useMovieFilter';
import MoreInfoSkeleton from '../components/MoreInfoSkeleton';

type Props = {
	movies: Movie[] | null;
};

const initialFullMovieState: FullMovieInfo = {
	description: '',
	duration: 0,
	genres: [],
	id: '',
	moods: [],
	releaseDate: '',
	releaseYear: 0,
	title: '',
	topCast: []
};

const Home: NextPage<Props> = ({ movies }) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [currentMovie, setCurrentMovie] = useState<FullMovieInfo>(
		initialFullMovieState
	);

	const { filtered, filterOnChange } = useMovieFilter(movies);
	const { searchResults } = filtered;

	const handleClick = async (
		e: React.MouseEvent<HTMLDivElement>
	): Promise<void> => {
		const { id } = e.currentTarget.dataset;
		const movie = await getMovieById(id);
		movie ? setCurrentMovie(movie) : setCurrentMovie(initialFullMovieState);
		setIsActive(true);
	};

	return (
		<>
			<div className={styles.nav}>
				<Input
					type="text"
					label="Search By Title"
					name="titleSearch"
					onChange={filterOnChange}
				/>
				<Input
					type="text"
					label="Search By Genre"
					name="genreSearch"
					onChange={filterOnChange}
				/>
			</div>
			<div className={styles.container}>
				<Head>
					<title>Movie Search</title>
					<meta name="description" content="Movie Search App" />
				</Head>
				<main className={styles.main}>
					<div className={styles.grid}>
						{searchResults?.length ? (
							searchResults.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									handleClick={handleClick}
								/>
							))
						) : (
							<p>No results found</p>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const movies = await getMovies();
	// alphabetize movies by title
	movies?.sort((a, b) => a.title.localeCompare(b.title));
	return {
		props: {
			movies
		}
	};
};

export default Home;
