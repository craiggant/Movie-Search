import { Movie, MovieWithGenreNames } from '../types';

/**
 * @param {string} input
 * @param {MovieWithGenreNames[]} movieArray
 * @returns {MovieWithGenreNames[]} arrayOfMatches
 */

const filterByTitle = (
	movieArray: MovieWithGenreNames[],
	input: string
): MovieWithGenreNames[] => {
	return movieArray.filter((movie) => {
		return movie.title.toLowerCase().includes(input?.toLowerCase());
	});
};

/**
 * @param {MovieWithGenreNames[]} movieArray
 * @param {string} input
 * @returns {MovieWithGenreNames[]} arrayOfMatches
 */

const filterByGenre = (
	movieArray: MovieWithGenreNames[],
	input: string
): MovieWithGenreNames[] => {
	if (input === '') return movieArray;
	return movieArray.filter((movie) => movie.genres.includes(input));
};

/**
 * Filters movie array by title, genre, or both.
 * @param {string} titleInput
 * @param {string} genreInput
 * @param {MovieWithGenreNames[]} movieArray
 * @returns {MovieWithGenreNames[]} arrayOfMatches
 */

export const filterMovies = (
	titleInput: string,
	genreInput: string,
	movieArray: MovieWithGenreNames[]
) => {
	const filteredByTitle = filterByTitle(movieArray, titleInput);

	const gInput = genreInput === 'All Genres' ? '' : genreInput;

	// filter by both title and genre
	if (titleInput && genreInput) return filterByGenre(filteredByTitle, gInput);

	// filter by genre only
	if (gInput) return filterByGenre(movieArray, gInput);

	// // filter by title only
	return filteredByTitle;
};
