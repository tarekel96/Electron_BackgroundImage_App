import React from 'react';
import Variants from '../styles/Variants.js';
import styles from './typography.module.css';
const { PARAGRAPH, SPAN, ANCHOR, BTN, H_1, H_2, H_3, H_4, H_5, H_6 } = Variants;

export const Typography = ({ children, variant, href = undefined }) => {
	let content;
	switch (variant) {
		case PARAGRAPH:
			content = <p className={styles['paragraph']}>{children}</p>;
			break;
		case SPAN:
			content = <span className={styles['span']}>{children}</span>;
			break;
		case ANCHOR:
			content = (
				<a className={styles['anchor']} href={href && href}>
					{children}
				</a>
			);
			break;
		case BTN:
			content = <p className={styles['btn']}>{children}</p>;
			break;
		case H_1:
			content = <h1 className={styles['h1']}>{children}</h1>;
			break;
		case H_2:
			content = <h2 className={styles['h2']}>{children}</h2>;
			break;
		case H_3:
			content = <h3 className={styles['h3']}>{children}</h3>;
			break;
		case H_4:
			content = <h4 className={styles['h4']}>{children}</h4>;
			break;
		case H_5:
			content = <h5 className={styles['h5']}>{children}</h5>;
			break;
		case H_6:
			content = <h6 className={styles['h6']}>{children}</h6>;
			break;
		default:
			content = { children };
	}
	return { content };
};
