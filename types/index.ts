export type Movie = {
	id: string;
	title: string;
	genres: string[];
};

export type Actor = {
	characterName: string;
	name: string;
};

export type FullMovieInfo = {
	description: string;
	duration: number;
	genres: string[];
	id: string;
	moods: [];
	releaseDate: string;
	releaseYear: number;
	title: string;
	topCast: Actor[];
};

export type MovieFilter = {
	titleSearch: '';
	genreSearch: '';
	searchResults: Movie[] | null;
};
