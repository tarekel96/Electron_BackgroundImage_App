import React from 'react';
import { NavBar } from './NavBar.js';

export const Layout = ({ children }) => {
	return (
		<main>
			<NavBar />
			{children}
		</main>
	);
};
