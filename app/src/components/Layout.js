import React from 'react';
import { SideNavBar } from './SideNavBar.js';

export const Layout = ({ children }) => {
	return (
		<main>
			<SideNavBar />
			{children}
		</main>
	);
};
