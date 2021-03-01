import React from 'react';
import Home from './pages/Home.js';
import Download from './pages/Download.js';
import ImagePull from './pages/ImagePull.js';
import Auth from './pages/Auth.js';
// BrowserRouter is used over HashRouter to avoid having # in URLs, since that seems to cause problems with Instagram authentication
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
				<Route path="/support" component={Support} exact />
				<Route path="/image_pull" component={ImagePull} exact />
				<Route path="/auth" component={Auth} />
			</Layout>
		</Router>
	);
};
const Pricing = () => {
	return <h2>Pricing</h2>;
};
const Support = () => {
	return <h2>Support</h2>;
};
export default App;
