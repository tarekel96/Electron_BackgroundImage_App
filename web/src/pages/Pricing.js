import React from 'react';
import { Typography } from '../components/Typography.js';
import { SectionImageLeft } from '../components/SectionImage.js';
import Variants from '../styles/Variants.js';
import styles from './pricing.module.css';
const { H_4, PARAGRAPH } = Variants;

const Pricing = () => {
	return (
		<section className={styles['pricingLayoutContainer']}>
			<section className={styles['pricingContainer']}>
			<SectionImageLeft />
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
