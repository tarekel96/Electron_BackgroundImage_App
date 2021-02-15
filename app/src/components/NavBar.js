import React from 'react';
import { Icon } from './Icon.js';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

export const NavBar = () => {
	return (
		<nav className={styles['navbar']}>
			<div className={styles['navItemsContainer']}>
				{navItemsArray.map(({ content, link, isLink }, index) => (
					<Link
						to={link}
						key={index}
						className={`${styles['navLink']} font-mont`}
						style={{
							textDecoration: isLink !== true ? 'none' : 'inherit',
							color: '#18A0FB'
						}}
					>
						<NavItem content={content} />
					</Link>
				))}
			</div>
		</nav>
	);
};
const NavItem = ({ content, hasLinkStyles = true }) => {
	return <div onClick={() => console.log('clicked')}>{content}</div>;
};
const navItemsArray = [
	{
		content: <Icon />,
		link: '/',
		hasLinkStyles: false
	},
	{
		content: 'Download',
		link: '/download'
	},
	{
		content: 'Pricing',
		link: '/pricing'
	},
	{
		content: 'Support',
		link: '/support'
	}
];
