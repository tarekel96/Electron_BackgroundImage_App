import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
// import DEFAULT_IMAGE from '../styles/SideNavProfile.jpg';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from './Typography.js';
import { Button } from './Button.js';
import styles from './sidebarnav.module.css';
import Variants from '../styles/Variants.js';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const { ipcRenderer } = window.require('electron');

const { H_2, BTN, SPAN } = Variants;

export const SideNavBar = () => {
	const [ state, setState ] = React.useState(true);
	const location = useLocation();
	// TODO(Chris): Find a less-hacky way to avoid showing the side navbar when
	// we want to actually display the slideshow up
	if (location.pathname === '/') {
		return null;
	}

	// <MenuItem icon={<FaGem />}>
	//   Dashboard
	//   <Link to="/" />
	// </MenuItem>;

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
							<Link to={link}>
								<Typography variant={H_2} className={styles['sidenavbarLink']}>
									{content}
								</Typography>
							</Link>
						</MenuItem>
					))}
					<Typography variant={SPAN} style={{ width: '100%', height: '100%' }}>
						<Button
							style={{ width: '93%', height: '100%', fontSize: '100%' }}
							onClick={() => ipcRenderer.send('exit')}
						>
							Exit
						</Button>
					</Typography>
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
