import React, {useState} from 'react'
import ImageWithDefault from './ImageWithDefault';
import {Movie} from "../types"
import styles from "../styles/Card.module.css";

type Props = {
  movie: Movie,
  handleClick: React.MouseEventHandler<HTMLDivElement>
}

const Card = ({movie, handleClick}:Props) => {
  const {id, title, genres} = movie;
  return (
    <div className={styles.card} data-id={id} onClick={handleClick}>
      <div className={styles.cardBody}>
          <ImageWithDefault
            src={`/moviePosterImages/${id}.jpeg`}
            fallback={`/moviePosterImages/defaultImage.jpeg`}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
      </div>
        <h3>{title}</h3>
    </div>
  );
}

export default Card
