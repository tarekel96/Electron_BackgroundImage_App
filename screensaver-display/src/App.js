// dependencies
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// routing dependencies
import Slideshow from './pages/Slideshow.js';
import UserHome from './pages/UserHome.js';
import UserInstagram from './pages/UserInstagram';
import UserRedditSearch from './pages/UserRedditSearch';
import UserSettings from './pages/UserSettings.js';
import Loading from './pages/Loading.js';

// UI dependencies
import { Layout } from './ui-components/Layout.js';

// styles
import './styles/main.css';
const { ipcRenderer } = window.require('electron');

const App = () => {
	const [ appMode, setAppMode ] = useState('ig');

	// update appMode based on previously submitted settings
	useEffect(() => {
		const settingsData = ipcRenderer.sendSync('read-settings-info');
		if (settingsData === null) {
			return;
		}

		const { source } = settingsData;
		if (source === 'ig') {
			setAppMode(() => 'ig');
		}
		else if (source === 'reddit') {
			setAppMode(() => 'reddit');
		}
	}, []); // pass empty array so it only invokes onComponentDidMount LifeCycle

	return (
		<Router>
			<Layout appMode={appMode}>
				<Route path="/" component={() => <Slideshow appMode={appMode} setAppMode={setAppMode} />} exact />
				<Route
					path="/posts"
					component={() => <UserInstagram appMode={appMode} setAppMode={setAppMode} />}
					exact
				/>
				<Route
					path="/search"
					component={() => <UserRedditSearch appMode={appMode} setAppMode={setAppMode} />}
					exact
				/>
				<Route
					path="/settings"
					component={() => <UserSettings appMode={appMode} setAppMode={setAppMode} />}
					exact
				/>
				<Route path="/settings_home" component={UserHome} exact />
				<Route path="/loading" component={Loading} />
			</Layout>
		</Router>
	);
};
// const Home = () => {
// 	return <h2>Home</h2>;
// };
export default App;
