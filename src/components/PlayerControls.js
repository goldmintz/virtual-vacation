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
				className='back-btn'
				disabled={currentTrackIndex === 0}
				onClick={() => {
					advanceTrack(false);
				}}>
				<i className='fas fa-backward' />
			</button>
			<button className='play-btn' onClick={() => setIsPlaying(!isPlaying)}>
				<i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
			</button>
			<button
				className='next-btn'
				onClick={() => {
					advanceTrack(true);
				}}>
				<i className='fas fa-forward' />
			</button>
		</div>
	);
};

export default PlayerControls;
