import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import Settings from './pages/Settings.js';
import Slideshow from "./pages/Slideshow.js";
import InstagramSettings from "./pages/InstagramSettings.js";
import Auth from "./pages/Auth.js";
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" component={Slideshow} exact />
        <Route path="/posts" component={Posts} exact />
        <Route path="/search" component={Search} exact />
        <Route path="/settings" component={Settings} exact />
        <Route path="/settings_home" component={Home} exact />

        <Route path="/settings_instagram" component={InstagramSettings} exact />
        <Route path="/auth" component={Auth} />
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
export default App;
