import { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styles from './slideshow.module.css';

const { ipcRenderer } = window.require('electron');

function Slideshow() {
	const [ postsInfo, setPostsInfo ] = useState([]);
	const [ postIndex, setPostIndex ] = useState(0);

	// settings state
	const [ cycleTime, setCycleTime ] = useState(2000);
	const [ imageSrc, setImageSrc ] = useState('');
	const [ showDescription, setShowDescription ] = useState(false);
	const [ showUserProfile, setShowUserProfile ] = useState(false);

	// fetch settings data from settings.json
	useEffect(
		() => {
			const selectedImages = ipcRenderer.sendSync('read-selected-images');
			if (selectedImages === null) {
				return;
			}
			else {
				console.log(selectedImages);
			}

			setPostsInfo(selectedImages.selectedImages);

			const settingsData = ipcRenderer.sendSync('read-settings-info');
			if (settingsData === null) {
				return;
			}

			// assign settings
			setCycleTime(settingsData.cycleTime * 1000); // multiple by 1000 bc milliseconds
			setImageSrc(settingsData.source);
			setShowDescription(settingsData.showDescription);
			setShowUserProfile(settingsData.showUserProfile);

			// slideshow transition logic
			const interval = setInterval(() => {
				if (postIndex >= postsInfo.length - 1) {
					setPostIndex(0);
				}
				else {
					setPostIndex(postIndex + 1);
				}
			}, cycleTime);

			return () => clearInterval(interval);
		},
		[ postIndex, postsInfo.length, cycleTime, imageSrc, showDescription, showUserProfile ]
	);

	const currentImage =
		postsInfo.length > 0 ? (
			<img src={postsInfo[postIndex]} className={styles.center} alt="" />
		) : (
			<div>
				<h1>Oops! You don't have any images available. Try logging in with the settings app.</h1>
				<Link to="/settings_instagram">Go here to log in.</Link>
			</div>
		);

	return currentImage;
}

export default Slideshow;
