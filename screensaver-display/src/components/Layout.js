import React from 'react';
import { SideNavBar } from './SideNavBar.js';
import styles from './layout.module.css';

export const Layout = ({ children }) => {
	return (
		<main className={styles['layout']}>
			<SideNavBar />
			{children}
		</main>
	);
};
