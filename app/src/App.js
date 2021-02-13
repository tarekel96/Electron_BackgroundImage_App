import React from 'react';
import Home from './pages/Home.js';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import './App.css';

const App = () => {
	return (
		<Router>
			<Layout>
				{/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}

				<Route path="/" component={Home} exact />
				<Route path="/download" component={Download} exact />
				<Route path="/pricing" component={Pricing} exact />
				<Route path="/support" component={Support} exact />
			</Layout>
		</Router>
	);
};
const Download = () => {
	return <h2>Download</h2>;
};
const Pricing = () => {
	return <h2>Pricing</h2>;
};
const Support = () => {
	return <h2>Support</h2>;
};
export default App;
