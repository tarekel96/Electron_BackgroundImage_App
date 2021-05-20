// dependencies
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

// UI dependencies
import { Typography } from './Typography.js';
import { Button } from './Button.js';

// styles
import 'react-pro-sidebar/dist/css/styles.css';
import styles from './styles/sidenavbar.module.css';
import Variants from '../styles/Variants.js';

const { ipcRenderer } = window.require('electron');

const { H_2, BTN, SPAN } = Variants;

export const SideNavBar = () => {
	const [ state, setState ] = React.useState(true);
	const [ activeIndex, setActiveIndex ] = React.useState('navItem_1');
	const [ navItems, setNavItems ] = React.useState([
		{
			content: 'IG Posts',
			link: '/posts',
			active: true,
			id: 'navItem_1'
		},
		{
			content: 'Reddit Search',
			link: '/search',
			active: false,
			id: 'navItem_2'
		},
		{
			content: 'Settings',
			link: '/settings',
			active: false,
			id: 'navItem_3'
		}
	]);
	const location = useLocation();
	// TODO(Chris): Find a less-hacky way to avoid showing the side navbar when
	// we want to actually display the slideshow up
	if (location.pathname === '/') {
		return null;
	}

	return (
		<ProSidebar className={styles['sidenavbar']}>
			<Menu iconShape={'round'} className={styles['sidenavbarMenu']}>
				<SubMenu className={styles['sidenavbarSubmenu']} defaultOpen={true} open={state}>
					{navItems !== undefined &&
						navItems.map(({ content, link, active, id }) => (
							<MenuItem
								className={active === true ? styles['activeItem'] : styles['sidenavitem']}
								key={id}
								onClick={() => {
									let copyNavItems = [ ...navItems ];
									let modNavItems = [];
									for (let i = 0; i < navItems.length; ++i) {
										if (copyNavItems[i].id !== id) {
											copyNavItems[i].active = false;
											modNavItems.push(copyNavItems[i]);
										}
										else {
											copyNavItems[i].active = true;
											modNavItems.push(copyNavItems[i]);
										}
									}
									setNavItems(() => modNavItems);
								}}
							>
								<Link replace to={link}>
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
