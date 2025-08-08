import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const response = await axios({
			method: 'GET',
			url: `${process.env.MOVIE_API_URL}/trending/movie/day?language=en-US`,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.BEARER_TOKEN}`
			}
		});

		res.status(200).json(response.data);
	} catch (error) {
		console.error('Error fetching trending movies:', error);
		res.status(500).json({ message: 'Failed to fetch movies' });
	}
}
