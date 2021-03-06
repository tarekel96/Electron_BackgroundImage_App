import React from 'react';
import DEFAULT_IMAGE from '../styles/ExampleImage2.jpg';
import styles from './sectionimage.module.css';

export const SectionImageLeft = () => {
	return (
            //<div className={styles['sectionImageBack']}>
			<img className={styles['sectionImageLeft']} src={DEFAULT_IMAGE} alt="SectionImage" />
            //</div>
	);
};
export const SectionImageRight = () => {
	return (
            //<div className={styles['sectionImageBack']}>
			<img className={styles['sectionImageRight']} src={DEFAULT_IMAGE} alt="SectionImage" />
            //</div>
	);
};