import React from 'react';
import styles from './typography.module.css';
import Variants from '../styles/Variants.js';
const { PARAGRAPH, SPAN, ANCHOR, BTN, H_1, H_2, H_3, H_4, H_5, H_6 } = Variants;

export const Typography = ({ children, variant, href = undefined, className = '' }) => {
	let content = {};
	switch (variant) {
		case PARAGRAPH:
			content = <p className={`${styles['paragraph']} ${className}`}>{children}</p>;
			break;
		case SPAN:
			content = <span className={`${styles['span']} ${className}`}>{children}</span>;
			break;
		case ANCHOR:
			content = (
				<a className={`${styles['anchor']} ${className}`} href={href && href}>
					{children}
				</a>
			);
			break;
		case BTN:
			content = <p className={`${styles['btn']} ${className}`}>{children}</p>;
			break;
		case H_1:
			content = <h1 className={`${styles['h1']} ${className}`}>{children}</h1>;
			break;
		case H_2:
			content = <h2 className={`${styles['h2']} ${className}`}>{children}</h2>;
			break;
		case H_3:
			content = <h3 className={`${styles['h3']} ${className}`}>{children}</h3>;
			break;
		case H_4:
			content = <h4 className={`${styles['h4']} ${className}`}>{children}</h4>;
			break;
		case H_5:
			content = <h5 className={`${styles['h5']} ${className}`}>{children}</h5>;
			break;
		case H_6:
			content = <h6 className={`${styles['h6']} ${className}`}>{children}</h6>;
			break;
		default:
			content = { children };
	}
	return <React.Fragment>{content}</React.Fragment>;
};
