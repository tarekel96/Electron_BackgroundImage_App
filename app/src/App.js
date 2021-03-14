import React from 'react';
import Home from './pages/Home.js';
import Test from './pages/Test.js';
import Download from './pages/Download.js';
import ContactUs from './pages/ContactUs.js';
import UserHome from './pages/UserHome.js';
import UserSettings from './pages/UserSettings.js';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import './styles/main.css';

const App = () => {
	return (
		<Router>
			<Layout>
				<Route path="/" component={Home} exact />
				<Route path="/download" component={Download} exact />
				<Route path="/pricing" component={Pricing} exact />
				<Route path="/contactus" component={ContactUs} exact />
				<Route path="/test" component={Test} exact />
				<Route path="/userhome" component={UserHome} />
				<Route path="/usersettings" component={UserSettings} exact/>
			</Layout>
		</Router>
	);
};
const Pricing = () => {
	return <h2>Pricing</h2>;
};
export default App;
