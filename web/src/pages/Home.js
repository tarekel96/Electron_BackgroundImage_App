import React from 'react';
import DEFAULT_IMAGE from '../styles/ExampleImage.jpg';
import EXAMPLE_IMG_3 from '../styles/ExampleImage3.jpg';
import EXAMPLE_IMG_4 from '../styles/ExampleImage4.jpg';
import EXAMPLE_IMG_5 from '../styles/ExampleImage5.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './home.module.css';
import './home.css';
const images = [ DEFAULT_IMAGE, EXAMPLE_IMG_3, EXAMPLE_IMG_4, EXAMPLE_IMG_5 ];

const Home = ({ imageSrc = DEFAULT_IMAGE, imgAlt = 'Screensaver' }) => {
	return (
		<div>
			<section className={styles['homePageImageContainer']}>
				<Carousel
					infiniteLoop={true}
					autoPlay={() => true}
					transitionTime={1000}
					interval={images.length * 1250}
					stopOnHover={false}
					showThumbs={false}
					className={styles['homePageImage']}
					showIndicators={false}
				>
				<LazyLoadImage
					src={DEFAULT_IMAGE}
    				alt={'example 3'}
   			 		effect="blur"/>
					{/*<img src={DEFAULT_IMAGE} alt="example 3" />*/}
					<img src={EXAMPLE_IMG_3} alt="example 4" />
					<img src={EXAMPLE_IMG_4} alt="example 4" />
					<img src={EXAMPLE_IMG_5} alt="example 4" />
				</Carousel>
			</section>
		</div>
	);
};

export default Home;
