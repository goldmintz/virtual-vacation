import React from 'react';
import { useDispatch } from 'react-redux';

import { getLand, resetPlayList } from '../actions/playerActions';

const PlaylistCard = ({ land }) => {
	const dispatch = useDispatch();

	return (
		<img
			className='land-playlist-card'
			src={land.image}
			alt={land.image}
			onClick={() => {
				// setIsPlaying(false);
				dispatch(resetPlayList());
				dispatch(getLand(land));
			}}
		/>
	);
};

export default PlaylistCard;
