import React from 'react';

const PlaylistCard = ({ land, handleSetLand }) => {
	return (
		<img
			className='land-playlist-card'
			src={land.image}
			alt={land.image}
			onClick={() => handleSetLand(land)}
		/>
	);
};

export default PlaylistCard;
