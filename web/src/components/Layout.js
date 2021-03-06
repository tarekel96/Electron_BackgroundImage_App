import React from 'react';
import { NavBar } from './NavBar.js';

export const Layout = ({ children, hasNav = true }) => {
	return (
		<main>
			{hasNav && <NavBar />}
			{children}
		</main>
	);
};
