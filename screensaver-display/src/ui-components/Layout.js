// dependencies
import React from 'react';

// UI dependencies
import { SideNavBar } from './SideNavBar.js';

// styles
import styles from './styles/layout.module.css';
import '../styles/main.css';

export const Layout = ({ children, appMode }) => {
	let mode = appMode === 'ig' ? 'igBackground' : 'redditBackground';
	return (
		<main className={`${styles['layout']} ${mode}`}>
			<SideNavBar />
			{children}
		</main>
	);
};
