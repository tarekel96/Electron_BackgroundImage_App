import React, { useState, useEffect } from 'react';
import ky from 'ky';
import styles from './posts.module.css';
import userPostStyles from './userposts.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Button } from '../components/Button.js';
const { ipcRenderer, shell } = window.require('electron');

const UserPosts = () => {
	const [ postsInfo, setPostsInfo ] = useState(null);
	const [ authToken, setAuthToken ] = useState(null);

	// state that stores images selected by user
	const [ selectedImages, setSelectedImages ] = useState([]);
	const [ errMessage, toggleErrMessage ] = useState(false);

	useEffect(
		() => {
			console.log('Post Info');
			console.log(postsInfo);

			if (authToken === null) {
				const existingToken = ipcRenderer.sendSync('ig-bd-read-token');
				if (existingToken === null) {
					return;
				}

				setAuthToken(existingToken);

				(async () => {
					const userInfo = await ky.get('https://graph.instagram.com/me/media', {
						searchParams: {
							fields: 'id,caption,media_url,media_type,permalink',
							access_token: existingToken
						}
					});
					if (!userInfo.ok) {
						console.log("There's been a fetch error. Status code: " + userInfo.status);
						console.log('Status text: ' + userInfo.statusText);
						const responseText = await userInfo.text();
						console.log('Response text: ' + responseText);
					}
					const userInfoJson = await userInfo.json();
					setPostsInfo(userInfoJson.data);
					console.log(userInfoJson);
					ipcRenderer.send('save-posts-info', userInfoJson.data);
				})();
			}
		},
		[ authToken, postsInfo ]
	);

	if (postsInfo === null) {
		return <h2>Loading...</h2>;
	}
	else {
		return (
			<div className={styles['UserPosts']}>
				<div className={styles['container']}>
					<div className={styles['imgContainer']}>
						{postsInfo.map(({ media_url }, index) => (
							<LazyLoadImage
								style={{
									border: selectedImages.includes(media_url) ? '4px solid green' : ''
								}}
								key={index}
								src={media_url}
								alt="IG post"
								onClick={(e) =>
									setSelectedImages((prevState) => {
										// user de-select images
										if (prevState.includes(media_url)) {
											return [ ...prevState ].filter((img) => img !== media_url);
										}
										// if image is not selected, select it
										return [ ...prevState, media_url ];
									})}
								effect="blur"
							/>
						))}
					</div>
					{/* <SelectedImages selectedImages={selectedImages} /> */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							// if no images are selected tell user
							if (selectedImages.length === 0) {
								toggleErrMessage(true);
								return;
							}
							else {
								// else submit form
								toggleErrMessage(false);
								const formValues = {
									selectedImages
								};
								const JSON_Data = JSON.stringify(formValues);
								// console.log('Submitted form');
								// console.log(JSON_Data);
								ipcRenderer.send('selected-images', JSON_Data);
							}
						}}
					>
						<input type="submit" />
						{errMessage && <ErrMessage />}
					</form>
				</div>
			</div>
		);
	}
};

const ErrMessage = () => {
	return (
		<React.Fragment>
			<br />
			<h4 className={userPostStyles['errMsg']}>ERROR: No images have been selected.</h4>
		</React.Fragment>
	);
};

const SelectedImages = ({ selectedImages }) => {
	if (selectedImages === []) {
		return <h2>No Images Selected Yet</h2>;
	}
	// else {
	// 	if (selectedImages.length === 0) {
	// 		return <h2>No Images Selected Yet</h2>;
	// 	}
	// }
	return (
		<section>
			<h2>Selected Images: </h2>
			<div>
				{selectedImages.map((img, index) => (
					<LazyLoadImage
						// style={{ border: selectedImg === media_url ? '4px solid green' : '' }}
						key={index}
						src={img}
						alt="IG post"
						effect="blur"
					/>
				))}
			</div>
		</section>
	);
};

export default UserPosts;
