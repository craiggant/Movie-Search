import axios, { AxiosResponse } from 'axios';
import { FullMovieInfo, Genre, Movie, MovieResults } from '../types';

// Function to get the correct base URL for API calls
const getApiBaseUrl = () => {
	// If we have a custom base URL set, use it
	if (process.env.NEXT_PUBLIC_API_BASE_URL) {
		return process.env.NEXT_PUBLIC_API_BASE_URL;
	}

	// For client-side requests, use the current origin
	if (typeof window !== 'undefined') {
		return window.location.origin;
	}

	// For server-side requests in production
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	// Fallback for local development
	return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

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
