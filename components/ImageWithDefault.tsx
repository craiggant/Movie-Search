import React, {useState} from 'react'
import Image, {ImageProps} from 'next/image'
import styles from '../styles/ImageWithDefault.module.css';

type ImageWithDefaultProps = ImageProps & {
  fallback: string
}

const ImageWithDefault = (props: ImageWithDefaultProps) => {
  const {src, alt, fallback} = props;
  const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(
		undefined
  );

   const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
			e?.currentTarget?.src !== fallback && setOnErrorSrc(fallback)
   };

  return (
			<Image
				{...props}
				className={styles.img}
				src={onErrorSrc || src}
				alt={alt}
				onError={handleOnError}
			/>

  );
}

export default ImageWithDefault
