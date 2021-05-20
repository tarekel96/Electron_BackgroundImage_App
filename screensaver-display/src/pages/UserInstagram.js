/*
	For editing later:

This component uses the `posts.module.css` and `userposts.module.css` files for styling.

The Reddit component currently uses its own stylesheet, because I could not understand the interactions
between those stylesheets and other javascript files. When updating the design for this page please change
the stylesheet files for this component. userredditsearch.module.css has good styling that prevents images
floating during window resizing.

*/

// dependencies
import React, { useState, useEffect, useReducer, Fragment } from 'react';
import ky from 'ky';

// UI dependencies
import { Button } from '../ui-components/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from './Loading';
import 'react-lazy-load-image-component/src/effects/blur.css';

// styles
import styles from './styles/posts.module.css';

import Modal from '../ui-components/Modal.js';

// access to electron window
const { ipcRenderer } = window.require('electron');

const UserInstagram = ({ appMode, setAppMode }) => {
	/* Modal State */
	const [ show, setShow ] = useState(false);

	const [ postsInfo, setPostsInfo ] = useState([]);
	const [ authToken, setAuthToken ] = useState(null);

	// state that stores images selected by user
	const [ selectedImages, setSelectedImages ] = useState([]);
	const [ errMessage, toggleErrMessage ] = useState(false);

	useEffect(() => {
		let isMounted = true;
		console.log('Post Info');
		console.log(postsInfo);

		if (authToken === null) {
			const existingToken = ipcRenderer.sendSync('ig-bd-read-token');
			if (existingToken === null) {
				return;
			}

			if (isMounted) setAuthToken(existingToken);

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
				if (isMounted) setPostsInfo(userInfoJson.data);
				console.log(userInfoJson);
			})();
		}

		return () => {
			isMounted = false;
		};
	}, []);

	// NOTE(Chris): Why is this is a function rather than a variable?
	// ANSWER:(Chris): Putting things into a function allows us to avoid evaluating this whole
	// Element tree until we need to, which in turn allows us to avoid evaluating
	// possible null values.
	const createImageSelection = () => {
		return (
			<div className={styles['UserPosts']}>
				{show && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)'
						}}
						className={styles['modalContainer']}
					>
						<Modal title="Images Updated" onClose={() => setShow(false)} show={show}>
							<p>Your selected posts have been updated.</p>
						</Modal>
					</div>
				)}
				<div className={styles['container']}>
					<h1 className={styles['title']}>Your Instagram Posts</h1>
					<div className={styles['imgContainer']}>
						{postsInfo.map(({ media_url, caption }, index) => (
							<LazyLoadImage
								className={styles['igThumbnail']}
								style={{
									border: selectedImages.find((imgObj) => imgObj.media_url === media_url)
										? '4px solid green'
										: ''
								}}
								key={index}
								src={media_url}
								alt="IG post"
								onClick={(e) =>
									setSelectedImages((prevState) => {
										let currImage = {
											media_url,
											caption: caption !== undefined ? caption : 'none'
										};
										// user de-select images
										if (prevState.find((imgObj) => imgObj.media_url === media_url)) {
											return [ ...prevState ].filter((imgObj) => imgObj.media_url !== media_url);
										}
										// if image is not selected, select it
										return [ ...prevState, currImage ];
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
								console.log('Submitted form');
								console.log(JSON_Data);
								ipcRenderer.send('selected-images', JSON_Data);
								setShow(true);
							}
						}}
					>
						<div className={styles['submitButtonContainer']}>
							<input
								type="submit"
								className={styles['submitButton']}
								onClick={() => setShow(() => true)}
							/>
						</div>
						{errMessage && <ErrMessage />}
					</form>
				</div>
			</div>
		);
	};

	if (authToken !== null && postsInfo.length === 0) {
		return <Loading />;
	}

	return (
		<div style={{ width: '100%' }}>
			<div className={styles['previewContainer']}>
				{/* <h1>Your InstaGram Posts</h1> */}
				{authToken === null ? (
					<Button className={styles['genericButton']} onClick={LogInToInstagram}>
						Log in.
					</Button>
				) : null}
				{authToken === null ? null : (
					<Fragment>
						<Button
							className={styles['previewButton']}
							onClick={() => {
								console.log('Preview button clicked!');
								ipcRenderer.send('preview-screensaver');
							}}
						>
							Preview
						</Button>
						<Button
							className={styles['igModeButton']}
							onClick={() => {
								setAppMode(() => 'ig');
							}}
						>
							IG Mode
						</Button>
						<Button
							className={styles['genericButton']}
							onClick={() => {
								ipcRenderer.sendSync('delete-ig-files');
								ipcRenderer.send('reload-page');
							}}
						>
							IG Logout
						</Button>
					</Fragment>
				)}
			</div>
			{postsInfo.length === 0 ? (
				<div className={styles['container']}>No images loaded yet.</div>
			) : (
				createImageSelection()
			)}
		</div>
	);
};

const ErrMessage = () => {
	return (
		<React.Fragment>
			<br />
			<h4 className={styles['errMsg']}>ERROR: No images have been selected.</h4>
		</React.Fragment>
	);
};

function LogInToInstagram() {
	const authURL =
		'https://api.instagram.com/oauth/authorize?client_id=765093417767855&redirect_uri=https://localhost:3000/auth/&scope=user_profile,user_media&response_type=code';

	const urlBasis = ipcRenderer.sendSync('get-url-basis');
	window.location = urlBasis + '#/loading';
	window.location = authURL;
}

export default UserInstagram;
