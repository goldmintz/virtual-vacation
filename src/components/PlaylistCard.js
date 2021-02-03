import React from 'react';
import placeholder from '../assets/images/placeholder.jpg';

const PlaylistCard = () => {
	return (
		<div className='playlist-card'>
			<div className='card-title'>EXTRAAA LONG TITLE</div>
			<div className='playlist-card-img'>
				<img src={placeholder} alt='placeholder' />
			</div>
		</div>
	);
};

export default PlaylistCard;
