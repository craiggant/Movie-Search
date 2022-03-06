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
	titleSearch: string;
	genreSearch: string;
	searchResults: Movie[] | null;
};

export type NameAndValueInput = {
	name: string;
	value: string;
};
