import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INFINITE_PLAY, PLAY_TRACK } from '../constants/types';
import { nextTrack } from '../actions/playerActions';

const PlayerControls = ({ advanceTrack }) => {
	const dispatch = useDispatch();

	//Access global state
	const isPlaying = useSelector((state) => state.player.isPlaying);
	const currentTrack = useSelector((state) => state.player.currentTrackIndex);
	const trackList = useSelector((state) => state.player.tracks);

	return (
		<div className='player-controls'>
			<div className='secondary-controls'>
				<button
					className='controls-btn infinite-btn'
					onClick={() => dispatch({ type: INFINITE_PLAY })}>
					<i className='fas fa-infinity'></i>
				</button>
				<button className='controls-btn shuffle-btn'>
					<i className='fas fa-random'></i>
				</button>
			</div>

			<div className='main-controls'>
				<button
					className='controls-btn back-btn'
					disabled={currentTrack === 0}
					onClick={() => {
						advanceTrack(false);
					}}>
					<i className='fas fa-backward' />
				</button>
				<button
					className='controls-btn play-btn'
					onClick={() => dispatch({ type: PLAY_TRACK })}>
					<i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
				</button>
				<button
					className='controls-btn next-btn'
					disabled={currentTrack === trackList.length - 1}
					onClick={() => {
						dispatch(nextTrack(true));
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
