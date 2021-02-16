import React from 'react';

const PlayListRoster = ({ playlist }) => {

    
	return (
		<div className='playlist-roster'>
			{playlist.tracks.map((track, i) => (
				<div className='track-listing' key={i}>
					{track.title}
				</div>
			))}
		</div>
	);
};

export default PlayListRoster;
