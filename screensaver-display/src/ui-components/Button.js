// dependencies
import React from 'react';

// UI dependencies
import { Typography } from './Typography.js';
import Variants from '../styles/Variants.js';

// styles
import styles from './styles/button.module.css';
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
