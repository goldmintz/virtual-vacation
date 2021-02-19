import React from 'react';

const PlaylistCard = ({ land, handleSetLand, setIsPlaying }) => {
	return (
		<img
			className='land-playlist-card'
			src={land.image}
			alt={land.image}
			onClick={() => {
				handleSetLand(land);
				setIsPlaying(false);
			}}
		/>
	);
};

export default PlaylistCard;
