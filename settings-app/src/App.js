import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import Settings from './pages/Settings.js';
import UserSearch from './pages/UserSearch';
import './styles/main.css';

const App = () => {
	return (
		<Router>
			<Layout>
				<Route path="/" component={Home} exact />
				<Route path="/posts" component={Posts} exact />
				<Route path="/search" component={UserSearch} exact />
				<Route path="/settings" component={Settings} exact />
			</Layout>
		</Router>
	);
};
const Home = () => {
	return <h2>Home</h2>;
};
const Posts = () => {
	return <h2>Posts</h2>;
};
export default App;
