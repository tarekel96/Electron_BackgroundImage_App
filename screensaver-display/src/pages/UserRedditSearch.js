import React, { useState } from 'react';
import Images from './PostImages';
import styles from './redditsearch.module.css';
import { SearchBar } from '../components/SearchBar.js';
import { Button } from '../components/Button.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function UserRedditSearch() {
	const [ selectedImg, setSelectedImg ] = useState(Images[0]);
	const [ query, setQuery ] = React.useState('');
	
	return (
		<div className={styles['container']}>
			<div className={styles['searchContainer']}>

				<Button type="enable" variant="small">
					Reddit Mode
				</Button>
				<SearchBar query={query} setQuery={setQuery} />
			</div>
			<div className={styles['imgContainer']}>
				{Images.map((img, index) => (
					<LazyLoadImage
					style={{ border: selectedImg === img ? '4px solid green' : '' }}
					key={index}
					src={img}
					alt="dog"
					onClick={() => setSelectedImg(img)}
					effect="blur"
					/>
				))}
			</div>
		</div>
		
		// <div className={styles['UserPosts']}>
		// 	<div className={styles['container']}>
		// 		<SearchBar query={query} setQuery={setQuery} />
		// 		<div className={styles['imgContainer']}>
		// 			{Images.map((img, index) => (
		// 				<LazyLoadImage
		// 					style={{ border: selectedImg === img ? '4px solid green' : '' }}
		// 					key={index}
		// 					src={img}
		// 					alt="dog"
		// 					onClick={() => setSelectedImg(img)}
		// 					effect="blur"
		// 				/>
		// 			))}
		// 		</div>
		// 		<Button type="enable" variant="small">
		// 			Reddit Mode
		// 		</Button>
		// 	</div>
		// </div>
	);
}
