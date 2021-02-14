import React from 'react';
import PlaylistCard from './PlaylistCard';

const PlayLists = ({ playlists }) => {
	return (
		<div className='slideshow'>
			<div className='image-wrapper'>Playlists</div>
			{playlists.map((playlist) => (
				<PlaylistCard playlist={playlist} />
			))}
		</div>
	);
};

export default PlayLists;
