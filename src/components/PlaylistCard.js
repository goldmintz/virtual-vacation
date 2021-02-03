import React from 'react';
import placeholder from '../assets/placeholder.jpg';

const PlaylistCard = () => {
	return (
		<div className='playlist-card'>
			<div className='playlist-card-img'>
				<img src={placeholder} alt='placeholder' />
			</div>
		</div>
	);
};

export default PlaylistCard;
