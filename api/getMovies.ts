import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {Movie} from '../types'

const config: AxiosRequestConfig = {
	method: 'get',
	url: process.env.MOVIE_API_URL,
  headers: { Authorization: process.env.API_AUTH_HEADER },
	validateStatus: function (status) {
		return status < 500; // Resolve only if the status code is less than 500
	}
};

export const getMovies = async () :Promise<Movie[] | null> => {
  try {
		const { data }:AxiosResponse = await axios(config);
		return data.data;
  } catch (error) {
		console.log(error);
    return null
  }
}
