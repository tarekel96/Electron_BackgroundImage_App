import React from 'react';
import Test from './pages/Test.js';
import UserHome from './pages/UserHome.js';
import Settings from './pages/UserSettings.js';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import './styles/main.css';
import UserSettings from './pages/UserSettings.js';

const App = () => {
	return (
		<Router>
			<Layout>
				<Route path="/" component={Home} exact />
				<Route path="/test" component={Test} exact />
				<Route path="/userhome" component={UserHome} />
				<Route path="/usersettings" component={UserSettings} exact/>
			</Layout>
		</Router>
	);
};
const Home = () => {
	return <h2>Pricing</h2>;
};
const Pricing = () => {
	return <h2>Pricing</h2>;
};
const Support = () => {
	return <h2>Support</h2>;
};
export default App;
