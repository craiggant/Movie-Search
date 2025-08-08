import axios, { AxiosResponse } from 'axios';
import { FullMovieInfo, Genre, Movie, MovieResults } from '../types';

const API_BASE_URL = `https://${process.env.VERCEL_URL || 'localhost:3000'}`;

export const getMovies = async (): Promise<Movie[]> => {
	try {
		const { data: movies }: AxiosResponse<MovieResults> = await axios.get(
			`${API_BASE_URL}/api/movies/trending`
		);
		return movies.results || [];
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getGenres = async (): Promise<Genre[]> => {
	try {
		const { data }: AxiosResponse = await axios.get(
			`${API_BASE_URL}/api/genres`
		);
		return data.genres || [];
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getMovieById = async (
	id: string | undefined
): Promise<FullMovieInfo | null> => {
	if (!id) return null;

	try {
		const { data }: AxiosResponse<FullMovieInfo> = await axios.get(
			`${API_BASE_URL}/api/movies/${id}`
		);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
