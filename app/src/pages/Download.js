/* eslint-disable no-unused-vars */

import React from 'react';
import { Button } from '../components/Button.js';
import { Typography } from '../components/Typography.js';
import styles from './download.module.css';
import Variants from '../styles/Variants.js';
const { PARAGRAPH, SPAN, ANCHOR, BTN, H_1, H_2, H_3, H_4, H_5, H_6 } = Variants;

const Download = () => {
	return (
		<div className={styles['downloadPageContainer']}>
			<section className={styles['downloadSubContainer1']}>
				<Typography variant={H_1}>Download Our Cross Platform Desktop Application</Typography>
				<Button>Download Now</Button>
			</section>
			<section className={styles['downloadSubContainers']}>
				<DownloadSubSection
					header="Choose Images Straight From Your Instagram Account"
					paragraph="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est."
				/>
				<DownloadSubSection
					header="Choose Images from Instagram Tags"
					paragraph="Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
				/>
			</section>
			<section className={styles['downloadSubContainers']}>
				<DownloadSubSection
					header="Customize The Number of Screensaver Images"
					paragraph="Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam."
				/>
				<DownloadSubSection
					header="Create a Custom Screensaver Cycle Time"
					paragraph="Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora."
				/>
			</section>
		</div>
	);
};

const DownloadSubSection = ({ header, paragraph }) => {
	return (
		<section className={styles['downloadSubSection']}>
			<Typography variant={H_4}>{header}</Typography>
			<Typography variant={PARAGRAPH}>{paragraph}</Typography>
		</section>
	);
};

export default Download;
