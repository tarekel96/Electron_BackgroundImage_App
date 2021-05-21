// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// styles
import styles from './styles/slideshow.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { ipcRenderer } = window.require('electron');

function Slideshow({ appMode, setAppMode }) {
	const [ postsInfo, setPostsInfo ] = useState([]);
	const [ postIndex, setPostIndex ] = useState(0);

	// settings states
	const [ cycleTime, setCycleTime ] = useState(3);
	// const [ imageSrc, setImageSrc ] = useState(''); // Removed
	const [ showDescription, setShowDescription ] = useState(false);
	const [ showUserProfile, setShowUserProfile ] = useState(false);

	// Runs once when page loads
	useEffect(() => {
		// load settings
		const settingsData = ipcRenderer.sendSync('read-settings-info');
		if (settingsData === null) {
			return;
		}
		else {
			console.log(settingsData);
		}

		// assign settings
		setCycleTime(settingsData.cycleTime); // settings file accounts for milliseconds
		setShowDescription(settingsData.showDescription);
		setShowUserProfile(settingsData.showUserProfile);

		// load post data

		let mostRecentState = true; // used to cancel RedditAPI fetch if a new fetch is triggered

		if (settingsData.source === 'reddit') {
			setAppMode('reddit');
			ipcRenderer.invoke('get-reddit-images', ipcRenderer.sendSync('read-subreddits'), 20).then((redditPosts) => {
				const images = redditPosts.map((post) => {
					return {
						media_url: post.data.url,
						caption: post.data.title
					};
				});
				console.log(images);
				if (mostRecentState) setPostsInfo(images);
			});
		}
		else {
			// default to instagram
			if (settingsData.source !== 'ig')
				console.log("Source not 'reddit' or 'ig', Defaulting to Instagram:", settingsData.source);
			setAppMode('ig');

			const selectedImages = ipcRenderer.sendSync('read-selected-images');
			if (selectedImages === null) {
				return;
			}
			else {
				console.log(selectedImages);
			}

			setPostsInfo(selectedImages.selectedImages);
		}

		return () => {
			mostRecentState = false;
		};
	}, []);

	// Interval to transition slideshow
	useEffect(() => {
			const interval = setInterval(() => {
				if (postIndex >= postsInfo.length - 1) {
					setPostIndex(0);
				}
				else {
					setPostIndex(postIndex + 1);
				}
				console.log(`Interval changed to slide ${postIndex+1}/${postsInfo.length}`);
			}, cycleTime);

			return () => clearInterval(interval);
		},
		[ postIndex, cycleTime, postsInfo ]
	);

	const currentImage =
		postsInfo.length > 0 ? (
			<section className={styles['slideShowContainer']} onmousemove={ipcRenderer.send('exit')}>
				{(postsInfo[postIndex].caption !== 'none' && showDescription) && (
					<div className={styles['captionBox']}>
						<p className={styles['postCaption']}>{postsInfo[postIndex].caption}</p>
					</div>
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
