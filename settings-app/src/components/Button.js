import React from 'react';
import { Typography } from '../components/Typography.js';
import styles from './button.module.css';
import Variants from '../styles/Variants.js';
const { BTN } = Variants;

export const Button = ({ children, variant = 'primary', className = '' }) => {
	return (
		<button className={styles['btn-' + variant] + ' ' + className}>
			<Typography variant={BTN}>{children}</Typography>
		</button>
	);
};
