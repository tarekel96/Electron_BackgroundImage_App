import React from 'react';
import DEFAULT_IMAGE from '../styles/ExampleImage.jpg';
import styles from './sectionimage.module.css';

export const SectionImage = () => {
	return (
			<div className={styles['sectionImageBack']}>
				<section className={styles['sectionImageContainer']}>
					<img className={styles['sectionImage']} src={DEFAULT_IMAGE} alt="Profile" />
				</section>
			</div>
	);
};