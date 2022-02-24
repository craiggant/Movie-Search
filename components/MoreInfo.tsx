import React from 'react'
import ImageWithDefault from './ImageWithDefault';
import { FullMovieInfo } from '../types';
import styles from '../styles/MoreInfo.module.css'
import Card from './Card';

type Props = {
  currentMovie: FullMovieInfo
}

// const makeGenreString = (genreArray: string[]):string => {
//   const genreString =
// }

const MoreInfo = ({currentMovie}:Props) => {
  const {description, duration, genres, id, releaseDate, releaseYear, title, topCast} = currentMovie;

  const genreString = genres.join(', ')
  //useMemo for time/year manipulations
  return (
		<div
			className={styles.movieCard}
			style={{
				backgroundImage: `url(/movieHeroImages/${id}.jpeg), url(/movieHeroImages/defaultImage.jpeg)`
			}}
		>
			<div className={styles.cardOverlay}></div>

			<div className={styles.card}>
				<div className={styles.movieCardMain}>
					<h2 className={styles.movieTitle}>{title}</h2>
					<div className={styles.movieSubtitle}>
						<p>{releaseYear}</p>
						<div className={styles.movieGenres}>
							<p>{genreString}</p>
						</div>
					</div>
					<p className={styles.movieRunTime}>
						{duration / 60} minutes
					</p>
					<p className={styles.movieDescription}>{description}</p>
					<div className={styles.movieCredits}>
						<p>
							<strong>Starring:</strong>
						</p>
						<ul
							className={`${styles.movieActors} ${styles.listInline}`}
						>
							{topCast.map((actor, i) => (
								<li key={i}>
									{actor.name}
									{actor.characterName && (
										<span> ({actor.characterName})</span>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
  );
}


export default MoreInfo
