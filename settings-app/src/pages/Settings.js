import React from 'react';
import { Button } from '../components/Button.js';
import styles from './settings.module.css';
import Variants from '../styles/Variants.js';
import { Typography } from '../components/Typography.js';
const { SPAN } = Variants;

const Settings = () => {
	return (
		<section className={styles['settingsSection']}>
			<form className={styles['settingsForm']}>
				<div>
					<label>
						<Typography variant={SPAN}>Cycle Speed</Typography>
					</label>
					<input name="input-cycle-speed" type="text" placeholder="Enter" />
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Generate Screensavers Through</Typography>
					</label>
					<select name="select-platform">
						<option value="instagram">Instagram</option>
						<option value="reddit">Reddit</option>
					</select>
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Transition Type</Typography>
					</label>
					<select name="select-transition-type">
						<option value="fade">Fade</option>
						<option value="no-transition">None</option>
					</select>
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Image Type</Typography>
					</label>
					<select name="select-image-type">
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
					<input name="input-description" type="checkbox" />
				</div>
				<div>
					<label>
						<Typography variant={SPAN}>Show Username/Profile Picture</Typography>
					</label>
					<input type="checkbox" />
				</div>
				<div>
					<label for="select-image">
						<Typography variant={SPAN}>Select image:</Typography>
					</label>
					<input type="file" name="select-image" accept="image/*" />
				</div>
			</form>
			<div>
				<Button className={styles['instagramLogout']}>Instagram Logout</Button>
			</div>
		</section>
	);
};

export default Settings;
