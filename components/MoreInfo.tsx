import React from 'react'
import ImageWithDefault from './ImageWithDefault';
import { FullMovieInfo } from '../types';

type Props = {
  currentMovie: FullMovieInfo
}

const MoreInfo = ({currentMovie}:Props) => {
  const {description, duration, genres, id, releaseDate, releaseYear, title, topCast} = currentMovie;
  return (
		<>
			<ImageWithDefault
				src={`/movieHeroImages/${id}.jpeg`}
				fallback={`/movieHeroImages/defaultImage.jpeg`}
				alt={title}
				width={1200}
				height={675}
        />
        <h3>{title}</h3>
        <h4>Description</h4>
        <p>{description}</p>
        <h4>Run Time</h4>
        <p>{duration/60} minutes</p>
		</>
  );
}

export default MoreInfo
