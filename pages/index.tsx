import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Input from "../components/Input"
import MoreInfo from '../components/MoreInfo'
import {getMovies, getMovieById} from '../api/getMovies'
import { Movie, FullMovieInfo } from '../types';
import styles from '../styles/Home.module.css'

type Props = {
  movies: Movie[]|null
}

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
}

const Home: NextPage<Props> = ({movies}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<FullMovieInfo>(initialFullMovieState);

  const handleClick = async (
		e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
		const { id } = e.currentTarget.dataset;
		const movie = await getMovieById(id);
		movie ? setCurrentMovie(movie) : setCurrentMovie(initialFullMovieState)
    setIsActive(true)
  };

  return (
		<>
			<div className={styles.nav}>
					<Input
						type="text"
						label="Search By Title"
						name="titleSearch"
					/>
					<Input
						type="text"
						label="Search By Genre"
						name="genreSearch"
					/>
			</div>
			<div className={styles.container}>
				<Head>
					<title>Movie Search</title>
					<meta name="description" content="Movie Search App" />
				</Head>
				<main className={styles.main}>
					<div className={styles.grid}>
						{movies &&
							movies.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									handleClick={handleClick}
								/>
							))}
					</div>
					<Modal isActive={isActive} setIsActive={setIsActive}>
						<MoreInfo currentMovie={currentMovie} />
					</Modal>
				</main>
			</div>
		</>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const movies = await getMovies()
  return {
    props: {
      movies
    }
  }
};

export default Home
