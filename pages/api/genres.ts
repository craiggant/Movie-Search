import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	if (!process.env.MOVIE_API_URL) {
		console.error('MOVIE_API_URL is not set');
		return res.status(500).json({
			message: 'MOVIE_API_URL environment variable is not configured'
		});
	}

	if (!process.env.BEARER_TOKEN) {
		console.error('BEARER_TOKEN is not set');
		return res.status(500).json({
			message: 'BEARER_TOKEN environment variable is not configured'
		});
	}

	try {
		const url = `${process.env.MOVIE_API_URL}/genre/movie/list?language=en-US`;

		const response = await axios({
			method: 'GET',
			url,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.BEARER_TOKEN}`
			}
		});

		res.status(200).json(response.data);
	} catch (error) {
		console.error('Error fetching genres:', error);
		if (axios.isAxiosError(error)) {
			console.error('Axios error details:', {
				status: error.response?.status,
				statusText: error.response?.statusText,
				data: error.response?.data
			});
		}
		res.status(500).json({ message: 'Failed to fetch genres' });
	}
}
