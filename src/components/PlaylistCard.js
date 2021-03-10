import React from 'react';
import { useDispatch } from 'react-redux';

import { getLand, setTrack } from '../actions/playerActions';

const PlaylistCard = ({
	land,
	// handleSetLand,
	// setIsPlaying,
	// setCurrentTrackIndex,
}) => {
	const dispatch = useDispatch();

	return (
		<img
			className='land-playlist-card'
			src={land.image}
			alt={land.image}
			onClick={() => {
				// setIsPlaying(false);

				dispatch(setTrack(0));
				dispatch(getLand(land));
			}}
		/>
	);
};

export default PlaylistCard;
