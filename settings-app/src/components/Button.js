import React from 'react';
import { Typography } from '../components/Typography.js';
import styles from './button.module.css';
import Variants from '../styles/Variants.js';
const { BTN } = Variants;

export const Button = ({ children, onClick }) => {
	return (
		<button className={styles['btn']} onClick={onClick}>
			<Typography variant={BTN}>{children}</Typography>
		</button>
	);
};
