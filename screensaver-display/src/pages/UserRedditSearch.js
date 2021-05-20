// dependencies
import React, { useState, useEffect, Fragment } from 'react';

// UI dependencies
import { Button } from '../ui-components/Button.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// styles
import styles from './styles/userredditsearch.module.css';
import './styles/RedditSearchbar.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// access to electron window
const { ipcRenderer } = window.require('electron');

const UserRedditSearch = ({ appMode, setAppMode }) => {

	const [ subreddits, setSubreddits ] = useState([]);
	const [ images, setImages ] = useState([]);

	// initialize subreddits from save file
	useEffect(() => {
		setSubreddits(ipcRenderer.sendSync('read-subreddits'));
	}, []);

	// Toggle a specific subreddit
	const ToggleSubreddit = (e) => {
		e.preventDefault();
		
		const newSubreddit = e.target.value;
		if (!subreddits.includes(newSubreddit)) {
			setSubreddits([...subreddits, newSubreddit]);
		} else {
			setSubreddits(subreddits.filter(item => item !== newSubreddit));
		}
	};

	// gather preview images when list of subreddits changes
	useEffect( async () => {
		if (subreddits.length){
			//const imageFeed = await getRedditQuery(subreddits, '');
			// use .send for an async call. .sendSync executes immediately
			const imageFeed = await ipcRenderer.invoke('get-reddit-images', subreddits, 20);
			setImages(imageFeed || []);
			console.log('Set images:',imageFeed);
		} else {
			setImages([]);
			console.log('Search Length not long enough for API pull');
		}
		ipcRenderer.send('save-subreddits', (JSON.stringify(subreddits)));
	}, [subreddits])

	return (
		<div className={styles['container']}>
			<div className={styles['searchContainer']}>
				<Button
					type="enable"
					variant="small"
					onClick={() => {setAppMode(() => 'reddit');}}
				>
					Reddit Mode
				</Button>

				<SubredditSearchbar subreddits={subreddits} setSubreddits={setSubreddits} ToggleSubreddit={ToggleSubreddit}/>
				
			</div>
			<div className={styles['imgContainer']}>
				{images.map((post, index) => 
					<LazyLoadImage 
						key={index} 
						src={post.data.url} 
						onError={(e)=> {
							e.target.style.display="none";
							}
						} 
						effect="blur"
					/>
				)}
			</div>
		</div>
	);
};


const SubredditSearchbar = ({subreddits, setSubreddits, ToggleSubreddit}) => {
	const [ search, setSearch ] = useState('');
	const [ query, setQuery ] = useState([]);
	
	// Development logs
	// useEffect( () => {
	// 	console.log('subreddit-list changed:',subreddits);
	// }, [subreddits]);
	
	useEffect( () => {
		console.log('search query changed:',query);
	}, [query]);
	//
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const searchQuery = await ipcRenderer.invoke('get-subreddits',search, 10);
		setQuery(searchQuery || []);
		setSearch('');
	};
	
	
	

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					className={styles['searchBar']}
					type="text"
					id="search"
					name="search"
					placeholder="r/"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<ul className={styles['searchResultList']}>
					{query.map((option, index) => {
						const subredditTag = option.data.display_name;
						const selected = subreddits.includes(subredditTag);
						return (
							<button 
								type="button" 
								className={styles['searchResult']} 
								value={subredditTag} 
								key={index}
								style={selected ? {backgroundColor: "lightgreen"} : {}}
								onClick={ToggleSubreddit}>
							r/{subredditTag}
								
							</button>
						);
					})}
				</ul>
			</div>

			<div className={styles["subredditListContainer"]}>
			{subreddits.map((subreddit, index) => {
				return (
					<button
						type="button" 
						value={subreddit} 
						key={index}
						onClick={ToggleSubreddit}
					>
					{subreddit}
					</button>
				)
			})}
		</div>
		</form>
	);
};

export default UserRedditSearch;
