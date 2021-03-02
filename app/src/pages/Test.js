import React from 'react';
import { SideNavBar } from '../components/SideNavBar.js';
import { Button } from '../components/Button.js';

const Test = () => {
	return (
		<div>
			<SideNavBar />
			<h1>Test Page</h1>
			<Button variant="secondary">Click Here</Button>
		</div>
	);
};

export default Test;
