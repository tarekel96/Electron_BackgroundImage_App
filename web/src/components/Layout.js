import React from 'react';
import { NavBar } from './NavBar.js';
import { Footer, Copyright } from './Footer.js';

export const Layout = ({ children, hasNav = true }) => {
	return (
		<main>
			{hasNav && <NavBar />}
			{children}
			<div>
				<Footer />
				<Copyright />
			</div>
		</main>
	);
};
