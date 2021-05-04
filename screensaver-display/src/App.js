// dependencies
import React, { useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// routing dependencies
import UserHome from './pages/UserHome.js';
import UserInstagram from './pages/UserInstagram';
import UserRedditSearch from './pages/UserRedditSearch';
import UserSettings from './pages/UserSettings.js';
import Auth from './pages/Auth.js';
import Slideshow from './pages/Slideshow.js';
import Loading from './pages/Loading.js';

// UI dependencies
import { Layout } from './ui-components/Layout.js';

// styles
import './styles/main.css';

const App = () => {
	const [ appMode, setAppMode ] = useState('ig');
	return (
		<Router>
			<Layout appMode={appMode}>
				<Route path="/" component={Slideshow} exact />
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
				<Route path="/settings" component={UserSettings} exact />
				<Route path="/settings_home" component={UserHome} exact />
				<Route path="/auth" component={Auth} />
				<Route path="/loading" component={Loading} />
			</Layout>
		</Router>
	);
};
// const Home = () => {
// 	return <h2>Home</h2>;
// };
export default App;
