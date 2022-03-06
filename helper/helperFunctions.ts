import { Movie } from '../types';

/**
 * @param {string} input
 * @param {Movie[]} movieArray
 * @returns {Movie[]} arrayOfMatches
 */

const filterByTitle = (movieArray: Movie[], input: string): Movie[] => {
	return movieArray.filter((movie) => {
		return movie.title.toLowerCase().includes(input?.toLowerCase());
	});
};

/**
 * @param {Movie[]} movieArray
 * @param {string} input
 * @returns {Movie[]} arrayOfMatches
 */

const filterByGenre = (movieArray: Movie[], input: string): Movie[] => {
	if (input === '') return movieArray;
	return movieArray.filter((movie) => movie.genres.includes(input));
};

/**
 * Filters movie array by title, genre, or both.
 * @param {string} titleInput
 * @param {string} genreInput
 * @param {Movie[]} movieArray
 * @returns {Movie[]} arrayOfMatches
 */

export const filterMovies = (
	titleInput: string,
	genreInput: string,
	movieArray: Movie[]
) => {
	const filteredByTitle = filterByTitle(movieArray, titleInput);

	const gInput = genreInput === 'All genres' ? '' : genreInput;

	// filter by both title and genre
	if (titleInput && genreInput) return filterByGenre(filteredByTitle, gInput);

	// filter by genre only
	if (gInput) return filterByGenre(movieArray, gInput);

	// // filter by title only
	return filteredByTitle;
};
