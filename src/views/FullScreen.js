import React from 'react';
import MiniPlayer from '../components/MiniPlayer';

const FullScreen = ({
	playlist,
	currentTrackIndex,
	setCurrentTrackIndex,
	isPlaying,
	setIsPlaying,
}) => {
	const bgStyles = {
		background: `url(/images/test_bg.jpg)`,
		backgroundSize: `100% 100%`,
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div className='full-screen-wrapper'>
			{/* Full screen background image */}
			<div className='album-bg' style={bgStyles}></div>

			{/* Music player aligned to bottom */}
			<MiniPlayer
				playlist={playlist}
				currentTrackIndex={currentTrackIndex}
				setCurrentTrackIndex={setCurrentTrackIndex}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
		</div>
	);
};

export default FullScreen;
