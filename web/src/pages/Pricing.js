import React from 'react';
import { Typography } from '../components/Typography.js';
import { SectionImageLeft } from '../components/SectionImage.js';
import Variants from '../styles/Variants.js';
import styles from './pricing.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const { H_4, PARAGRAPH } = Variants;

const Pricing = () => {
	return (
		<section className={styles['pricingLayoutContainer']}>
			<section className={styles['pricingContainer']}>
			<LazyLoadImage
					src={SectionImageLeft}
    				alt={'Section Image'}
   			 		effect="blur"/>
				<div>
					<Typography variant={H_4}>Pricing</Typography>
					<Typography variant={PARAGRAPH}>
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
						consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
						qui dolorem.
					</Typography>
				</div>
			</section>
		</section>
	);
};

export default Pricing;
