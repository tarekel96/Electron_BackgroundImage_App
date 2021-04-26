import React from 'react';
import { Typography } from '../components/Typography.js';
import styles from './button.module.css';
import Variants from '../styles/Variants.js';
const { BTN } = Variants;

export const Button = ({
	children,
	variant = 'primary',
	className = '',
	type = 'button',
	onClick = undefined,
	style = {}
}) => {
	return (
		<button
			className={styles['btn-' + variant] + ' ' + className}
			type={type}
			onClick={onClick !== undefined ? onClick : (e) => e.preventDefault()}
			style={style}
		>
			<Typography variant={BTN}>{children}</Typography>
		</button>
	);
};
