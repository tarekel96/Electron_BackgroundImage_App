import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import './styles/main.css';

const App = () => {
	return (
		<Router>
			<Layout>
				<Route path="/" component={Home} exact />
				<Route path="/posts" component={Posts} exact />
				<Route path="/search" component={Search} exact />
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
const Search = () => {
	return <h2>Search</h2>;
};
const Settings = () => {
	return <h2>Settings</h2>;
};
export default App;
