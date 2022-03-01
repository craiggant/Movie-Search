import React, { useEffect, useState } from 'react';
import { getMovieById } from '../api/getMovies';
import { FullMovieInfo } from '../types';

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

const useCurrentMovie = () => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [currentMovie, setCurrentMovie] = useState<FullMovieInfo>(
		initialFullMovieState
	);

	const handleMovieClick = async (
		e: React.MouseEvent<HTMLDivElement>
	): Promise<void> => {
		const { id } = e.currentTarget.dataset;
		const movie = await getMovieById(id);
		movie ? setCurrentMovie(movie) : setCurrentMovie(initialFullMovieState);
		setIsActive(true);
	};

	return {
		isActive,
		setIsActive,
		currentMovie,
		handleMovieClick
	};
};

export default useCurrentMovie;
