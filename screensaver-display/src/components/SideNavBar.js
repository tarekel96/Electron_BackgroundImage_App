import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
// import DEFAULT_IMAGE from '../styles/SideNavProfile.jpg';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from './Typography.js';
import styles from './sidebarnav.module.css';
import Variants from '../styles/Variants.js';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const { H_2 } = Variants;

export const SideNavBar = () => {
	const [ state, setState ] = React.useState(true);
	const location = useLocation();

	console.log(location);
	// TODO(Chris): Find a less-hacky way to avoid showing the side navbar when
	// we want to actually display the slideshow up
	if (location.pathname === '/') {
		return null;
	}

	return (
		<ProSidebar className={styles['sidenavbar']}>
			<Menu iconShape={'round'} className={styles['sidenavbarMenu']}>
				<SubMenu
					className={styles['sidenavbarSubmenu']}
					defaultOpen={true}
					open={state}
					onOpenChange={() => setState((prevState) => !prevState)}
				>
					{sideNavItemsArray.map(({ content, link }, index) => (
						<MenuItem className={styles['sidenavitem']} key={index}>
							<Typography variant={H_2}>{content}</Typography>
							<Link to={link} />
						</MenuItem>
					))}
				</SubMenu>
			</Menu>
		</ProSidebar>
	);
};

const sideNavItemsArray = [
	{
		content: 'Home',
		link: '/settings_home'
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
	},
	{
		content: 'Instagram-Specific Settings',
		link: '/settings_instagram'
	}
];

// export const SideNavBar = ({ username = 'John Doe' }) => {
// 	return (
// 		<nav className={`${styles['sidenavbar']}`}>
// 			<div className={styles['sidebarContainer']}>
// 				<section className={styles['sidenavbarImageContainer']}>
// 					<img className={styles['sidenavbarImage']} src={DEFAULT_IMAGE} alt="Profile" />
// 					<Typography variant={H_2}>{username}</Typography>
// 				</section>
// 				<section className={styles['sidenavitems']}>
// 					{sideNavItemsArray.map(({ content }, index) => <SideNavItem content={content} key={index} />)}
// 				</section>
// 			</div>
// 		</nav>
// 	);
// };
// const SideNavItem = ({ content }) => {
// 	const [ isCurrent, setCurrent ] = React.useState(false);
// 	let state = '';
// 	React.useEffect(
// 		() => {
// 			console.log(isCurrent);
// 		},
// 		[ isCurrent ]
// 	);
// 	if (isCurrent) {
// 		state = ' whiteBG';
// 	}
// 	return (
// 		<div
// 			onClick={() => setCurrent((prev) => !prev)}
// 			className={styles['sidenavitem'] + state}
// 			styles={{
// 				backgroundColor: isCurrent ? '#fff' : 'eeeded'
// 			}}
// 		>
// 			<SideNavBullet />
// 			<span className={styles['sidenavitemContent']}>{content}</span>
// 		</div>
// 	);
// };

// const SideNavBullet = () => {
// 	return (
// 		<React.Fragment>
// 			<svg className={styles['sidenavBullet']} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
// 				<circle cx="10.5" cy="10.5" r="10.5" fill="#838383" />
// 			</svg>
// 		</React.Fragment>
// 	);
// };
