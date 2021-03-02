import React from 'react';
import DEFAULT_IMAGE from '../styles/SideNavProfile.jpg';
import { Typography } from './Typography.js';
import styles from './sidebarnav.module.css';
import Variants from '../styles/Variants.js';
const { H_2 } = Variants;

export const SideNavBar = ({ username = 'John Doe' }) => {
	return (
		<nav className={`${styles['sidenavbar']}`}>
			<div className={styles['sidebarContainer']}>
				<section className={styles['sidenavbarImageContainer']}>
					<img className={styles['sidenavbarImage']} src={DEFAULT_IMAGE} alt="Profile" />
					<Typography variant={H_2}>{username}</Typography>
				</section>
				<section className={styles['sidenavitems']}>
					{sideNavItemsArray.map(({ content }, index) => <SideNavItem content={content} key={index} />)}
				</section>
			</div>
		</nav>
	);
};
const SideNavItem = ({ content }) => {
	const [ isCurrent, setCurrent ] = React.useState(false);
	let state = '';
	React.useEffect(
		() => {
			console.log(isCurrent);
		},
		[ isCurrent ]
	);
	if (isCurrent) {
		state = ' whiteBG';
	}
	return (
		<div
			onClick={() => setCurrent((prev) => !prev)}
			className={styles['sidenavitem'] + state}
			styles={{
				backgroundColor: isCurrent ? '#fff' : 'eeeded'
			}}
		>
			<SideNavBullet />
			<span className={styles['sidenavitemContent']}>{content}</span>
		</div>
	);
};
const sideNavItemsArray = [
	{
		content: 'Home',
		link: '/'
	},
	{
		content: 'My Posts',
		link: '/posts'
	},
	{
		content: 'Search',
		link: '/search'
	},
	{
		content: 'Settings',
		link: '/settings'
	}
];

const SideNavBullet = () => {
	return (
		<React.Fragment>
			<svg className={styles['sidenavBullet']} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="10.5" cy="10.5" r="10.5" fill="#838383" />
			</svg>
		</React.Fragment>
	);
};
