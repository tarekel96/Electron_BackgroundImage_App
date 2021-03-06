import React from 'react';
import { NavBar } from './NavBar.js';
import { SideNavBar } from './SideNavBar.js';

export const Layout = ({ children }) => {
	return (
		<main>
			<NavBar />
			<SideNavBar />
			{children}
		</main>
	);
};
