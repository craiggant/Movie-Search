import React, { useState } from 'react';
import { filterMovies } from '../helper/helperFunctions';
import { Movie, MovieFilter } from '../types';

const useMovieFilter = (movies: Movie[] | null) => {
	const initialState: MovieFilter = {
		titleSearch: '',
		genreSearch: '',
		searchResults: movies
	};

	const [filtered, setFiltered] = useState<MovieFilter>(initialState);

	type MyInput = {
		name: string;
		value: string;
	};

	const filterOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		customFilter({ name, value });
	};

	const customFilter = (input: MyInput): void => {
		const { name, value } = input;
		console.log(name, value);
		const titleInput =
			name === 'titleSearch' ? value : filtered.titleSearch;
		const genreInput =
			name === 'genreSearch' ? value : filtered.genreSearch;

		const currentlyFilteredMovies =
			movies && filterMovies(titleInput, genreInput, movies);

		setFiltered({
			...filtered,
			[name]: value,
			searchResults: currentlyFilteredMovies
		});
	};

	return {
		filtered,
		customFilter,
		filterOnChange
	};
};

export default useMovieFilter;
