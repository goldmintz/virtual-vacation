import React from 'react';
import { useDispatch } from 'react-redux';

import { getLand, resetPlayList } from '../actions/playerActions';
import { PAUSE_TRACK } from '../constants/types';

const PlaylistCard = ({ land }) => {
	const dispatch = useDispatch();

	return (
		<img
			className='land-playlist-card'
			src={land.image}
			alt={land.image}
			onClick={() => {
				dispatch({ type: PAUSE_TRACK });
				dispatch(resetPlayList());
				dispatch(getLand(land));
			}}
		/>
	);
};

export default PlaylistCard;
