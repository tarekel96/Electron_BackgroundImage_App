import React from 'react';
import styles from './icon.module.css';

export const Icon = () => {
	return (
		<section className={styles['navIcon']}>
			<SVGIcon />
			<h2 className={styles['navIconTitle']}>Screensaver</h2>
		</section>
	);
};
const SVGIcon = () => {
	return (
		<svg width="49" height="24" viewBox="0 0 49 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.4295 23.4814L48.6992 23.4814L48.699 23.4813L48.699 7.63508L34.2696 0.962923L34.2696 16.8093L34.2697 16.8093L0.000198364 16.8093L14.4295 23.4814Z"
				fill="black"
			/>
		</svg>
	);
};
