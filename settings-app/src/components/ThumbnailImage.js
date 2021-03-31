import React from 'react';
import DEFAULT_IMAGE from '../styles/ExampleImage2.jpg';
import styles from './thumbnailimage.module.css';

export const ThumbnailImage = () => {
	return (
			<img className={styles['thumbnailImage']} src={DEFAULT_IMAGE} alt="Thumbnail" />
	);
};