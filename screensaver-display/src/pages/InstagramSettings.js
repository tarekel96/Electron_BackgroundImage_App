import { React, useEffect, useState } from 'react';
import ky from 'ky';

const { ipcRenderer, shell } = window.require('electron');

const InstagramSettings = () => {
	const [ authToken, setAuthToken ] = useState(null);
	const [ postsInfo, setPostsInfo ] = useState(null);

	useEffect(
		() => {
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
					ipcRenderer.send('save-posts-info', userInfoJson.data);
				})();
			}
		},
		[ authToken, postsInfo ]
	);

	const mediaImages = postsInfo ? <div>{postsInfo.map((info) => <img src={info.media_url} alt="" />)}</div> : null;
	const loginButton = authToken === null ? <button onClick={LogInToInstagram}>Log in.</button> : null;
	const previewButton = authToken === null ? null : <button onClick={() => {ipcRenderer.send('preview-screensaver')}}>Preview</button>

	return (
		<div>
			<h1>Instagram Settings</h1>
			{loginButton}
			{previewButton}
			<p style={{ wordWrap: 'break-word' }}>
				{authToken === null ? 'Instagram token: Not logged in' : `Instagram token: ${authToken}`}
			</p>
			{mediaImages}
		</div>
	);
};

function LogInToInstagram() {
	const authURL =
		'https://api.instagram.com/oauth/authorize?client_id=765093417767855&redirect_uri=https://localhost:3000/auth/&scope=user_profile,user_media&response_type=code';

	window.location = authURL;
}

export default InstagramSettings;
