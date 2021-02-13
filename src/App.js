import React, { useState } from 'react';
import './App.css';

// import children
import SlideShow from './components/SlideShow';
import Player from './components/Player';

// import tracklist array
import { tracks } from './tracks';

const App = () => {
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [nextTrackIndex, setNextTrackIndex] = useState(currentTrackIndex + 1);
	const [prevTrackIndex, setPrevTrackIndex] = useState(currentTrackIndex - 1);

	return (
		<div className='page-wrapper'>
			<SlideShow />
			<Player
				tracks={tracks}
				currentTrackIndex={currentTrackIndex}
				currentTrack={tracks[currentTrackIndex]}
				setCurrentTrack={setCurrentTrackIndex}
				setNextTrack={setNextTrackIndex}
				setPrevTrack={setPrevTrackIndex}
			/>
		</div>
	);
};

export default App;
