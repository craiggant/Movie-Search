import React, { useMemo } from 'react';
import { FullMovieInfo } from '../types';
import styles from '../styles/MoreInfo.module.css';

type Props = {
	currentMovie: FullMovieInfo;
};

const MoreInfo = ({ currentMovie }: Props) => {
	const { description, duration, genres, id, releaseYear, title, topCast } =
		currentMovie;

	const genreString = useMemo(() => genres.join(', '), [genres]);
	const runTime = useMemo(() => duration / 60, [duration]);

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
					<p className={styles.movieRunTime}>{runTime} minutes</p>
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
};

export default MoreInfo;
