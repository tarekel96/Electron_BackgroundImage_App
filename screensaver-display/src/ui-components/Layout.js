// dependencies
import React from 'react';

// UI dependencies
import { SideNavBar } from './SideNavBar.js';

// styles
import styles from './styles/layout.module.css';

export const Layout = ({ children }) => {
	return (
		<main className={styles['layout']}>
			<SideNavBar />
			{children}
		</main>
	);
};
