import React from 'react';

const PlayerControls = ({
	isPlaying,
	setIsPlaying,
	advanceTrack,
	currentTrackIndex,
	tracks,
	isInfinite,
	setIsInfinite,
}) => {
	return (
		<div className='player-controls'>
			<div className='secondary-controls'>
				<button
					className='controls-btn infinite-btn'
					onClick={() => setIsInfinite(true)}>
					<i className='fas fa-infinity'></i>
				</button>
				<button className='controls-btn shuffle-btn'>
					<i className='fas fa-random'></i>
				</button>
			</div>

			<div className='main-controls'>
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
					disabled={currentTrackIndex === tracks.length - 1}
					onClick={() => {
						advanceTrack(true);
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
