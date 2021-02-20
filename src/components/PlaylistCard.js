import React from 'react';

const PlaylistCard = ({
	land,
	handleSetLand,
	setIsPlaying,
	setCurrentTrackIndex,
}) => {
	return (
		<img
			className='land-playlist-card'
			src={land.image}
			alt={land.image}
			onClick={() => {
				handleSetLand(land);
				setIsPlaying(false);
				setCurrentTrackIndex(0);
			}}
		/>
	);
};

export default PlaylistCard;
