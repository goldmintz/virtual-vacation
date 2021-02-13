import React, { useState } from 'react';
import './App.css';

// import children
import SlideShow from './components/SlideShow';
import Player from './components/Player';

// import tracklist array
import { tracks } from './tracks';

const App = () => {
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

	return (
		<div className='page-wrapper'>
			<SlideShow />
			<Player
				tracks={tracks}
				currentTrackIndex={currentTrackIndex}
				setCurrentTrackIndex={setCurrentTrackIndex}
			/>
		</div>
	);
};

export default App;
