import React, { useState } from 'react';
import { filterMovies } from '../helper/helperFunctions';
import { MovieFilter, MovieWithGenreNames, NameAndValueInput } from '../types';

const useMovieFilter = (movies: MovieWithGenreNames[] | null) => {
	const initialState: MovieFilter = {
		titleSearch: '',
		genreSearch: '',
		searchResults: movies
	};

	const [filtered, setFiltered] = useState<MovieFilter>(initialState);

	const filterOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		customFilter({ name, value });
	};

	const customFilter = ({ name, value }: NameAndValueInput): void => {
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
