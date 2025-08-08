import React, { memo, useMemo } from 'react';
import { format } from 'date-fns';
import { FullMovieInfo } from '../types';
import styles from '../styles/MoreInfo.module.css';
import Link from 'next/link';

type Props = {
	currentMovie: FullMovieInfo;
};

const MoreInfo = memo(({ currentMovie }: Props) => {
	const {
		backdrop_path,
		homepage,
		genres,
		overview,
		release_date,
		title,
		runtime
	} = currentMovie;

	const genreString = useMemo(
		() => genres.map(({ name }) => name).join(', '),
		[genres]
	);

	return (
		<div
			className={styles.movieCard}
			style={{
				backgroundSize: 'contain',
				backgroundPosition: 'left',
				backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_API_URL}${backdrop_path}), url(/movieHeroImages/defaultImage.jpeg)`
			}}
		>
			<div className={styles.cardOverlay}></div>

			<div className={styles.card}>
				<div className={styles.movieCardMain}>
					<h2 className={styles.movieTitle}>{title}</h2>
					<div className={styles.movieSubtitle}>
						<p>{format(new Date(release_date), 'MMMM dd, yyyy')}</p>
						<div className={styles.movieGenres}>
							<p>{genreString}</p>
						</div>
					</div>
					<p className={styles.movieRunTime}>{runtime} minutes</p>
					<p className={styles.movieDescription}>{overview}</p>
					<div className={styles.movieCredits}>
						<p>
							<strong>Movie Homepage:</strong>
						</p>
						<Link href={homepage}>
							<a target="_blank" rel="noopener noreferrer">
								{homepage}
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
});

MoreInfo.displayName = 'MoreInfo';

export default MoreInfo;
