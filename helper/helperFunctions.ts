import { Movie } from '../types';

/**
 * @param {string} input
 * @param {Movie[]} movieArray
 * @returns {Movie[]} arrayOfMatches
 */

const filterByTitle = (movieArray:Movie[], input:string):Movie[] => {
	return movieArray.filter((movie) => {
		return movie.title.toLowerCase().includes(input?.toLowerCase());
	});
};


/**
 * @param {Movie[]} movieArray
 * @param {string} input
 * @returns {Movie[]} arrayOfMatches
 */

const filterByGenre = (movieArray: Movie[], input: string):Movie[] => {
	return movieArray.filter((movie) => {
		if (movie.genres.length)
			return movie.genres.find((genre) =>
				genre.toLowerCase().includes(input.toLowerCase())
			);
	});
};

/**
 * Filters movie array by title, genre, or both.
 * @param {string} nameSearch
 * @param {string} tagSearch
 * @param {Movie[]} movieArray
 * @returns {Movie[]} arrayOfMatches
 */

export const filterMovies= (
	titleInput:string,
	genreInput:string,
	movieArray:Movie[]
) => {
	const filteredByTitle = filterByTitle(movieArray, titleInput);

	// filter by both title and genre
	if (titleInput && genreInput) return filterByGenre(filteredByTitle, genreInput);

	// filter by genre only
	if (genreInput) return filterByGenre(movieArray, genreInput);

	// // filter by title only
	return filteredByTitle;
};