import React from 'react';

const UserSettings = () => {
	return (
	<form>
  		<label>
   		 	Cycle Speed: <input type="text" name="name" />
  		</label>
  		<input type="submit" value="Confirm" />
		  
		<br></br>
		<br></br>

		<label>
   		 	Generate Screensavers Through Hashtag: <input type="text" value="#" name="name" />
  		</label>
  		<input type="submit" value="Enable" />
		
		<br></br>
		<br></br>

		<label>
   		 	Upload Image:
  		</label>
  		<input type="submit" value="Upload File" />
	</form>
	);
};

export default UserSettings;