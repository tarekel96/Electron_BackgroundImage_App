import React from 'react';
import DEFAULT_IMAGE from '../styles/ExampleImage2.jpg';
import styles from './sectionimage.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const SectionImageLeft = () => {
	return (
            //<div className={styles['sectionImageBack']}>
			<LazyLoadImage
					className={styles['sectionImageLeft']} 
					src={DEFAULT_IMAGE}
    				alt={'SectionImage'}
   			 		effect="blur"/>
            //</div>
	);
};
export const SectionImageRight = () => {
	return (
            //<div className={styles['sectionImageBack']}>
			<LazyLoadImage
					className={styles['sectionImageRight']} 
					src={DEFAULT_IMAGE}
    				alt={'SectionImage'}
   			 		effect="blur"/>
            //</div>
	);
};