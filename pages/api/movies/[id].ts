import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// API route to fetch individual movie details by ID
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { id } = req.query;

	if (!id || typeof id !== 'string') {
		return res.status(400).json({ message: 'Movie ID is required' });
	}
\
	try {
		const response = await axios({
			method: 'GET',
			url: `${process.env.MOVIE_API_URL}/movie/${id}?language=en-US`,
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.BEARER_TOKEN}`
			}
		});

		res.status(200).json(response.data);
	} catch (error) {
		console.error('Error fetching movie by ID:', error);
		res.status(500).json({ message: 'Failed to fetch movie' });
	}
}
