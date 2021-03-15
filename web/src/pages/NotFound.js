import React from 'react';
import styles from './notfound.module.css';

const NotFound = () => {
	return (
		<div style={styles['notFoundContainer']}>
			<h1>
				Uh Oh...<br />Page Not Found (404 Error)
			</h1>
		</div>
	);
};

export default NotFound;
