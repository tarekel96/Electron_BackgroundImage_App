import React from 'react';
import { Typography } from '../components/Typography.js';
import styles from './contactus.module.css';
import Variants from '../styles/Variants.js';
import { Copyright, Footer } from '../components/Footer.js';
const { PARAGRAPH, H_1, H_4 } = Variants;

const ContactUs = () => {
	return (
		<div className={styles['contactUsPageContainer']}>
			<section className={styles['contactUsSubContainer1']}>
				<Typography variant={H_1}>Contact Us</Typography>
			</section>
			<section className={styles['contactUsSubContainers']}>
				<ContactUsSubSection
					header="Get in Touch"
					paragraph="Want to know more about our software? Contact our team if you have any questions. Our team is here to answer any simple or complex inquiries. We are happy to help!"
				/>
			</section>
			<section className={styles['contactUsSubContainers']}>
				<ContactUsSubSection
					header="Direct Contact"
					paragraph="Phone Number: (714)-111-1111"
					link="Email Us: ScreenSaverSupport@gmail.com"
				/>
			</section>
			<Footer />
			<Copyright />
		</div>
	);
};

const ContactUsSubSection = ({ header, paragraph, paragraph2, link }) => {
	return (
		<section className={styles['contactUsSubSection']}>
			<Typography variant={H_4}>{header}</Typography>
			<Typography variant={PARAGRAPH}>{paragraph}</Typography>
			<Typography variant={PARAGRAPH}>
				{paragraph2}
				<address>
					<a href="mailto:no-reply@screensaver.app">{link}</a>
				</address>
			</Typography>
		</section>
	);
};

export default ContactUs;
