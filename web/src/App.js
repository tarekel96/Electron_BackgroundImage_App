import React from 'react';
import Home from './pages/Home.js';
import Download from './pages/Download.js';
import Pricing from './pages/Pricing.js';
import ContactUs from './pages/ContactUs.js';
import NotFound from './pages/NotFound.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import './styles/main.css';

const App = () => {
	return (
		<Router>
			<Layout>
				<Route path="/" component={Home} exact />
				<Route path="/download" component={Download} exact />
				<Route path="/pricing" component={Pricing} exact />
				<Route path="/contact" component={ContactUs} exact />
			</Layout>
		</Router>
	);
};
export default App;
