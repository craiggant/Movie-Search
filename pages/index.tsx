import type { NextPage, GetServerSideProps } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/Input';
import MoreInfo from '../components/MoreInfo';
import Nav from '../components/Nav';
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
			<Nav filterOnChange={filterOnChange}></Nav>
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
