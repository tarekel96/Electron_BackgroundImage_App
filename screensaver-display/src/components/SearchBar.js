import React from 'react';

export const SearchBar = ({ query, setQuery }) => {
	const BarStyling = { width: '20rem', background: '#F2F1F9', border: 'none', padding: '0.5rem' };
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<input
				style={BarStyling}
				key="random1"
				value={query}
				onChange={(e) => {
					e.preventDefault();
					setQuery(e.target.value);
				}}
				placeholder={'r/Search'}
			/>
		</form>
	);
};
