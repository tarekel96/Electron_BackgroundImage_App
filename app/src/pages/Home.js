import React from 'react';
import styles from './home.module.css';

import DEFAULT_IMAGE from '../styles/ExampleImage.jpg';

const Home = ({
	// imageSrc = process.env.PUBLIC_URL + '/assets/media/images/ExampleImage.jpg',
	imageSrc = DEFAULT_IMAGE,
	imgAlt = 'Screensaver'
}) => {
	return (
		<div>
			<section className={styles['homePageImageContainer']}>
				<img className={styles['homePageImage']} src={imageSrc} alt={imgAlt} />
			</section>
		</div>
	);
};

export default Home;
