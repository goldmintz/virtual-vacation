import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	INFINITE_PLAY,
	SHUFFLE_PLAY,
	PLAY_TRACK,
	PAUSE_TRACK,
} from '../constants/types';
import { advanceTrack } from '../actions/playerActions';
import { setTrackList } from '../actions/trackListActions';

const PlayerControls = () => {
	const dispatch = useDispatch();

	//Access global state
	const isPlaying = useSelector((state) => state.player.isPlaying);
	const currentTrackIndex = useSelector(
		(state) => state.tracks.currentTrackIndex,
	);
	const trackList = useSelector((state) => state.tracks.trackList);
	const favoritesPlayList = useSelector((state) => state.favoritesPlayList);
	const land = useSelector((state) => state.tracks.land);

	const tracks = land.name !== 'Favorites' ? trackList : favoritesPlayList;

	return (
		<div className='player-controls'>
			<div className='secondary-controls'>
				<button
					className='controls-btn infinite-btn'
					onClick={() => dispatch({ type: INFINITE_PLAY })}>
					<i className='fas fa-infinity'></i>
				</button>
				<button
					className='controls-btn shuffle-btn'
					onClick={() => {
						dispatch({ type: SHUFFLE_PLAY }); //set playthru to shuffle
						dispatch(setTrackList(land)); // dispatch(setTrackList()); //update playlist to shuffled array
					}}>
					<i className='fas fa-random'></i>
				</button>
			</div>

			<div className='main-controls'>
				<button
					className='controls-btn back-btn'
					disabled={currentTrackIndex === 0}
					onClick={() => {
						dispatch(advanceTrack(false));
					}}>
					<i className='fas fa-backward' />
				</button>
				{isPlaying ? (
					<button
						className='controls-btn play-btn'
						onClick={() => dispatch({ type: PAUSE_TRACK })}>
						<i className={'fas fa-pause'}></i>
					</button>
				) : (
					<button
						className='controls-btn play-btn'
						onClick={() => dispatch({ type: PLAY_TRACK })}>
						<i className={'fas fa-play'}></i>
					</button>
				)}

				<button
					className='controls-btn next-btn'
					disabled={currentTrackIndex === tracks.length - 1}
					onClick={() => {
						dispatch(advanceTrack(true));
					}}>
					<i className='fas fa-forward' />
				</button>
			</div>

			<div className='secondary-controls'>
				<button className='controls-btn volume-btn'>
					<i className='fas fa-volume-up'></i>
				</button>
				<button className='controls-btn volume-btn'>
					<i className='fas fa-list'></i>
				</button>
			</div>
		</div>
	);
};

export default PlayerControls;
