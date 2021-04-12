import React from 'react';
import { Button } from '../components/Button.js';
import styles from './settings.module.css';
import Variants from '../styles/Variants.js';
import { Typography } from '../components/Typography.js';
const { SPAN, H_4 } = Variants;

const Settings = () => {
	// form data - stored in React state
	/* Cycle Speed */
	const [ cycleSpeed, setCycleSpeed ] = React.useState(0);
	const [ cycleErrMsg, toggleCycleErr ] = React.useState(false);
	/* Source Selection - Instagram or Reddit */
	const [ source, setSource ] = React.useState('');
	const SOURCE_TYPES = [ 'instagram', 'reddit', 'local' ];
	/* Transition Type - Fade or None */
	const [ transitionType, setTransitionType ] = React.useState('');
	const TRANSITION_TYPES = [ 'fade', 'no-transition' ];
	/* Image Type - jpg, jpeg, png, or gif */
	const [ imageType, setImageType ] = React.useState('');
	const IMAGE_TYPES = [ 'jpg', 'jpeg', 'png', 'gif' ];
	/* Show Description Text Checkbox */
	const [ showDescription, setShowDescription ] = React.useState(false);
	const descriptionValue = 'show-description';
	/* Show Username/Profile Picture Checkbox */
	const [ showUserProfile, setShowUserProfile ] = React.useState(false);
	const showUserProfileValue = 'show-user-profile';
	/* Upload Local Image */
	const [ previewSrc, setPreviewSrc ] = React.useState('');
	const [ localImageFile, setLocalImageFile ] = React.useState('');
	const handlePreview = (e) => {
		e.preventDefault();

		let file = e.target.files[0];
		let reader = new FileReader();

		if (e.target.files.length === 0) {
			return;
		}

		reader.onloadend = (e) => {
			setPreviewSrc(reader.result);
			setLocalImageFile(reader.result);
		};

		reader.readAsDataURL(file);
	};

	/* Form data that is submitted upon user submission via Submit btn */
	const formValues = {
		cycleSpeed,
		source,
		transitionType,
		imageType,
		showDescription,
		localImageFile
	};
	return (
		<section className={styles['settingsSection']}>
			<form
				className={styles['settingsForm']}
				onSubmit={(e) => {
					e.preventDefault();
					console.log(formValues);
				}}
			>
				<div>
					<label>
						<Typography variant={SPAN}>Cycle Speed</Typography>
					</label>
					<input
						name="input-cycle-speed"
						type="text"
						placeholder={0}
						onChange={(e) => {
							if (isNaN(Number(e.target.value))) {
								toggleCycleErr(() => true);
								return;
							}
							else {
								toggleCycleErr(() => false);
								setCycleSpeed(e.target.value);
							}
						}}
					/>
				</div>
				{cycleErrMsg && <CycleSpeedErrMessage />}
				<div>
					<label>
						<Typography variant={SPAN}>Generate Screensavers Through</Typography>
					</label>
					<select
						name="select-source"
						onChange={(e) => {
							if (SOURCE_TYPES.includes(e.target.value)) {
								setSource(e.target.value);
							}
							else {
								console.log(e.target.value);
								throw new Error(console.log('ERROR: An invalid source was selected'));
							}
						}}
					>
						<option value="instagram">Instagram</option>
						<option value="reddit">Reddit</option>
						<option value="local">Local (file on own computer)</option>
					</select>
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Transition Type</Typography>
					</label>
					<select
						name="select-transition-type"
						onChange={(e) => {
							if (TRANSITION_TYPES.includes(e.target.value)) {
								setTransitionType(e.target.value);
							}
							else {
								throw new Error(console.log('ERROR: An invalid transition type was selected'));
							}
						}}
					>
						<option value="fade">Fade</option>
						<option value="no-transition">None</option>
					</select>
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Image Type</Typography>
					</label>
					<select
						name="select-image-type"
						onChange={(e) => {
							if (IMAGE_TYPES.includes(e.target.value)) {
								setImageType(e.target.value);
							}
							else {
								throw new Error(console.log('ERROR: An invalid image type was selected'));
							}
						}}
					>
						<option value="jpg">.jpg</option>
						<option value="png">.jpeg</option>
						<option value="png">.png</option>
						<option value="png">.gif</option>
					</select>
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Show Description Text</Typography>
					</label>
					<input
						name="input-description"
						type="checkbox"
						value={descriptionValue}
						onChange={(e) => {
							if (e.target.value === descriptionValue) {
								setShowDescription(true);
							}
							else {
								setShowDescription(false);
							}
						}}
					/>
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Show Username/Profile Picture</Typography>
					</label>
					<input
						type="checkbox"
						name="input-user-profile"
						value={showUserProfileValue}
						onChange={(e) => {
							if (e.target.value === showUserProfile) {
								setShowUserProfile(true);
							}
							else {
								setShowUserProfile(false);
							}
						}}
					/>
				</div>
				<div>
					<label htmlFor="select-image">
						<Typography variant={SPAN}>Select image:</Typography>
					</label>
					<input type="file" name="select-image" accept="image/*" onChange={handlePreview} />
				</div>
				{previewSrc !== '' && (
					<React.Fragment>
						<br />
						<div className={styles['exitPreviewBtnContainer']}>
							<button
								className={styles['exitPreviewBtn']}
								onClick={(e) => {
									setPreviewSrc('');
								}}
							>
								X
							</button>
						</div>
						<div>
							<div>
								<Typography variant={H_4}>Preview: </Typography>
							</div>
							<img src={previewSrc} alt={'Preview'} className={styles['previewImg']} />
						</div>
					</React.Fragment>
				)}
				<Button type="submit" variant="secondary">
					Submit
				</Button>
			</form>
			<div>
				<Button className={styles['instagramLogout']}>Instagram Logout</Button>
			</div>
		</section>
	);
};

export default Settings;

const CycleSpeedErrMessage = () => {
	return (
		<React.Fragment>
			<br />
			<h4 className={styles['cycleErrMsg']}>
				ERROR: An invalid input was entered for cycle speed. Please enter a integer value.
			</h4>
		</React.Fragment>
	);
};