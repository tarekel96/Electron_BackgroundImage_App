import React from 'react';
import { Typography } from '../components/Typography.js';
import styles from './button.module.css';
import Variants from '../styles/Variants.js';
const { BTN } = Variants;

export const Button = ({ children, variant = 'primary', className = '', type = 'button' }) => {
	return (
		<button className={styles['btn-' + variant] + ' ' + className} type={type}>
			<Typography variant={BTN}>{children}</Typography>
		</button>
	);
};
