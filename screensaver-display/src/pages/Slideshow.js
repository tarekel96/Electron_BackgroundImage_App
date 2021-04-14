import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './slideshow.module.css';

const { ipcRenderer } = window.require('electron');

function Slideshow() {
	const [ postsInfo, setPostsInfo ] = useState([]);
	const [ postIndex, setPostIndex ] = useState(0);
	const [ cycleTime, setCycleTime ] = useState(2000);

	useEffect(
		() => {
			const existingInfo = ipcRenderer.sendSync('read-posts-info');
			if (existingInfo === null) {
				return;
			}

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

	console.log(postsInfo);

	const currentImage =
		postsInfo.length > 0 ? (
			<img src={postsInfo[postIndex].media_url} className={styles.center} alt="" />
		) : (
			<Redirect
				to={{
					pathname: '/settings'
				}}
			/>
			// <h1>Oops! You don't have any images available. Try logging in with the settings app.</h1>
		);

	return currentImage;
}

export default Slideshow;
