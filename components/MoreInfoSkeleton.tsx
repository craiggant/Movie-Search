import React, { useMemo } from 'react';
import styles from '../styles/MoreInfoSkeleton.module.css';

const MoreInfoSkeleton = () => {
	return (
		<div className={styles.movieCard}>
			<div className={styles.cardOverlay}></div>

			<div className={styles.card}>
				<div className={styles.movieCardMain}>
					<h2 className={styles.movieTitle}></h2>
					<div className={styles.movieSubtitle}>
						<p></p>
						<p className={styles.movieGenres}></p>
					</div>
					<p className={styles.movieRunTime}></p>
					<p className={styles.movieDescription}></p>
				</div>
			</div>
		</div>
	);
};

export default MoreInfoSkeleton;
