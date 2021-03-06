import React from 'react';
import Test from './pages/Test.js';
import UserHome from './pages/UserHome.js';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import './styles/main.css';

const App = () => {
	return (
		<Router>
			<Layout>
				<Route path="/" component={Home} exact />
				<Route path="/test" component={Test} exact />
				<Route path="/userhome" component={UserHome} />
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
