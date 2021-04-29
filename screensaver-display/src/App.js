// dependencies
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// routing dependencies
import UserHome from './pages/UserHome.js';
import UserInstagram from './pages/UserInstagram';
import UserRedditSearch from './pages/UserRedditSearch';
import UserSettings from './pages/UserSettings.js';
import InstagramSettings from './pages/InstagramSettings.js';
import Auth from './pages/Auth.js';
import Slideshow from './pages/Slideshow.js';

// UI dependencies
import { Layout } from './ui-components/Layout.js';

// styles
import './styles/main.css';

const App = () => {
	return (
		<Router>
			<Layout>
				<Route path="/" component={Slideshow} exact />
				<Route path="/posts" component={UserInstagram} exact />
				<Route path="/search" component={UserRedditSearch} exact />
				<Route path="/settings" component={UserSettings} exact />
				<Route path="/settings_home" component={UserHome} exact />
				<Route path="/settings_instagram" component={InstagramSettings} exact />
				<Route path="/auth" component={Auth} />
			</Layout>
		</Router>
	);
};
// const Home = () => {
// 	return <h2>Home</h2>;
// };
export default App;
