import React from 'react';
import Home from './pages/Home.js';
import Download from './pages/Download.js';
import Pricing from './pages/Pricing.js';
import ContactUs from './pages/ContactUs.js';
import NotFound from './pages/NotFound.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import './styles/main.css';

const App = () => {
	return (
		<Router basename="/Electron_BackgroundImage_App">
			<Layout>
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/download" component={Download} exact />
					<Route path="/pricing" component={Pricing} exact />
					<Route path="/contact" component={ContactUs} exact />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
	);
};
export default App;
