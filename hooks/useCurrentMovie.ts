import React, { useState } from 'react';
import { getMovieById } from '../api/getMovies';
import { FullMovieInfo, Genre } from '../types';

const initialFullMovieState: FullMovieInfo = {
	adult: false,
	backdrop_path: '',
	belongs_to_collection: null,
	budget: 0,
	genres: [],
	homepage: '',
	id: 0,
	imdb_id: null,
	origin_country: [],
	original_language: '',
	original_title: '',
	overview: '',
	popularity: 0,
	poster_path: '',
	production_companies: [],
	production_countries: [],
	release_date: '',
	revenue: 0,
	runtime: 0,
	spoken_languages: [],
	status: '',
	tagline: '',
	title: '',
	video: false,
	vote_average: 0,
	vote_count: 0
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
