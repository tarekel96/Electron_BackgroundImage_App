import React from 'react';
import { Typography } from '../components/Typography.js';
import styles from './button.module.css';
import Variants from '../styles/Variants.js';
const { BTN } = Variants;

export const Button = ({ children, variant = 'primary' }) => {
	return (
		<button className={styles['btn-' + variant]}>
			<Typography variant={BTN}>{children}</Typography>
		</button>
	);
};
