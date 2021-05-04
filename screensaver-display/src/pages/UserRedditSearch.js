// dependencies
import React, { useState, useEffect, Fragment } from 'react';
import Images from './PostImages';
import { getSubreddits } from '../api-components/redditApiInterface.js';

// UI dependencies
import { Button } from '../ui-components/Button.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// styles
import styles from './styles/userredditsearch.module.css';
import './styles/RedditSearchbar.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const UserRedditSearch = ({ appMode, setAppMode }) => {
	return (
		<div className={styles['container']}>
			<div className={styles['searchContainer']}>
				<Button
					type="enable"
					variant="small"
					onClick={() => {
						setAppMode(() => 'reddit');
					}}
				>
					Reddit Mode
				</Button>

				<SubredditSearchbar />
			</div>
			<div className={styles['imgContainer']}>
				{Images.map((img, index) => <LazyLoadImage key={index} src={img} alt="dog" effect="blur" />)}
			</div>
		</div>
	);
};

const Results = (props) => {
	const returnList = () => {
		const defaultIcon =
			'https://styles.redditmedia.com/t5_6/styles/communityIcon_a8uzjit9bwr21.png?width=256&s=d28ea66f16da5a6c2ccae0d069cc4d42322d69a9';
		return props.posts.map((post, index) => {
			return (
				<div className="result" key={index}>
					<div className="subredditThumbnail">
						<img src={post.data.header_img || defaultIcon} alt={`r/${post.data.display_name}`} />
					</div>
					<p className="subredditTitle">r/{post.data.display_name}</p>
				</div>
			);
		});
	};

	return (
		<Fragment>
			<div className="resultsBox">{returnList()}</div>
		</Fragment>
	);
};

const SubredditSearchbar = (props) => {
	const [ search, setSearch ] = useState('');
	const [ query, setQuery ] = useState([]);
	const [ subreddits, setSubreddits ] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		setQuery(getSubreddits(search, 5) || []);

		console.log('query:', query);

		setSearch('');
		return;
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					className="searchbar"
					type="text"
					id="search"
					name="search"
					placeholder="r/"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<ul>
					{query.map((option) => {
						console.log('creating button');
						return (
							<button type="button" className="search-result" value="example">
								Example
							</button>
						);
					})}
				</ul>
			</div>
		</form>
	);
};

export default UserRedditSearch;
