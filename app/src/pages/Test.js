import React from 'react';
import { SideNavBar } from '../components/SideNavBar.js';
import { Button } from '../components/Button.js';
import { Copyright, Footer } from '../components/Footer.js';
import { SectionImageLeft, SectionImageRight } from '../components/SectionImage.js';

const Test = () => {
	return (
		<div>
			<SideNavBar />
			<SectionImageLeft />
			<SectionImageRight />
			<h1>Test Page</h1>
			<Button variant="secondary">Click Here</Button>
			<Footer />
			<Copyright />
		</div>
	);
};

export default Test;
