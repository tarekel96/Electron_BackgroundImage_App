import { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styles from './slideshow.module.css';

const { ipcRenderer } = window.require('electron');

function Slideshow() {
	const [ postsInfo, setPostsInfo ] = useState([]);
	const [ postIndex, setPostIndex ] = useState(0);

	// settings state
	const [ settings, setSettings ] = useState({});
	//const [ images, setImages ] = useState([]);
	const [ cycleTime, setCycleTime ] = useState(2000);
	const [ imageSrc, setImageSrc ] = useState('');
	const [ showDescription, setShowDescription ] = useState(false);
	const [ showUserProfile, setShowUserProfile ] = useState(false);

	// fetch settings data from settings.json
	useEffect(
		() => {
			const settingsData = ipcRenderer.sendSync('read-settings-info');
			if (settingsData === null) {
				return;
			}

			//console.log(settingsData);

			setCycleTime(settingsData.cycleTime * 1000); // multiple by 1000 bc milliseconds
			setImageSrc(settingsData.source);
			setShowDescription(settingsData.showDescription);
			setShowUserProfile(settingsData.showUserProfile);
			setSettings(settingsData);
		},
		[ postIndex, postsInfo.length, cycleTime, imageSrc, showDescription, showUserProfile ]
	);

	useEffect(
		() => {
			const existingInfo = ipcRenderer.sendSync('read-posts-info');
			if (existingInfo === null) {
				return;
			}
			console.log('IG Info');
			console.log(existingInfo);
			setPostsInfo(existingInfo);
			const interval = setInterval(() => {
				if (postIndex >= postsInfo.length - 1) {
					setPostIndex(0);
					// console.log("Reset postIndex to 0.");
				}
				else {
					setPostIndex(postIndex + 1);
					// console.log("Incremented postIndex!");
				}

				// console.log("postIndex was most recently: " + postIndex);
			}, cycleTime);

			return () => clearInterval(interval);
		},
		[ postIndex, postsInfo.length, cycleTime ]
	);

	// console.log(postsInfo);

	const currentImage =
		postsInfo.length > 0 ? (
			<img src={postsInfo[postIndex].media_url} className={styles.center} alt="" />
		) : (
			// <Redirect
			// 	to={{
			// 		pathname: '/settings'
			// 	}}
			// />
			<div>
				<h1>Oops! You don't have any images available. Try logging in with the settings app.</h1>
				<Link to="/settings_instagram">Go here to log in.</Link>
			</div>
		);

	return currentImage;
}

export default Slideshow;
