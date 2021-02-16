import React from 'react';

const PlayerControls = ({
	isPlaying,
	setIsPlaying,
	advanceTrack,
	currentTrackIndex,
}) => {
	return (
		<div className='player-controls'>
			<button
				className='controls-btn back-btn'
				disabled={currentTrackIndex === 0}
				onClick={() => {
					advanceTrack(false);
				}}>
				<i className='fas fa-backward' />
			</button>
			<button
				className='controls-btn play-btn'
				onClick={() => setIsPlaying(!isPlaying)}>
				<i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
			</button>
			<button
				className='controls-btn next-btn'
				onClick={() => {
					advanceTrack(true);
				}}>
				<i className='controls-btn fas fa-forward' />
			</button>
		</div>
	);
};

export default PlayerControls;
