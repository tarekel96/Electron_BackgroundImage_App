// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

// styles
import styles from './styles/slideshow.module.css';

const { ipcRenderer } = window.require('electron');

function Slideshow({ appMode, setAppMode }) {
	const [ postsInfo, setPostsInfo ] = useState([]);
	const [ postIndex, setPostIndex ] = useState(0);

	// settings state
	const [ cycleTime, setCycleTime ] = useState(3);
	const [ imageSrc, setImageSrc ] = useState('');
	const [ showDescription, setShowDescription ] = useState(false);
	const [ showUserProfile, setShowUserProfile ] = useState(false);

	// useEffect as componentDidMount()
	useEffect(() => {
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
		else {
			console.log(settingsData);
		}

		// update appMode settings to change background color before displaying slide show
		if (settingsData.source === 'ig' && appMode !== 'ig') {
			setAppMode('ig');
		}
		else if (settingsData.source === 'reddit' && appMode !== 'reddit') {
			setAppMode('reddit');
		}

		// assign settings
		setCycleTime(settingsData.cycleTime * 1000); // multiple by 1000 bc milliseconds
		setImageSrc(settingsData.source);
		setShowDescription(settingsData.showDescription);
		setShowUserProfile(settingsData.showUserProfile);
	}, []);

	// fetch settings data from settings.json
	useEffect(
		() => {
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
		[ postIndex, postsInfo.length, cycleTime, imageSrc, showDescription, showUserProfile, appMode, setAppMode ]
	);

	const currentImage =
		postsInfo.length > 0 ? (
			<section className={styles['slideShowContainer']}>
				{postsInfo[postIndex].caption !== 'none' && (
					<p className={styles['postCaption']}>{postsInfo[postIndex].caption}</p>
				)}
				<img src={postsInfo[postIndex].media_url} className={styles.center} alt="" />
			</section>
		) : (
			<div>
				<h1>
					Oops! You don't have any images available. Try logging in with the settings app and selecting some
					images.
				</h1>
				{/* <Link to="/settings_instagram">Go here to log in.</Link> */}
				<div>
					<button onClick={() => ipcRenderer.send('exit')}>Exit</button>
				</div>
			</div>
		);

	return currentImage;
}

export default Slideshow;
