import React, { useState } from 'react';
import './App.css';

// import children
import Playlists from './components/Playlists';
import Player from './components/Player';

// import tracklist array
import { tracks } from './tracks';

const App = () => {
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

	const playlists = ['tropical', 'frontier', 'new orleans', 'haunted'];

	return (
		<div className='page-wrapper'>
			<Player
				tracks={tracks}
				currentTrackIndex={currentTrackIndex}
				setCurrentTrackIndex={setCurrentTrackIndex}
			/>
			{/* <Playlists playlists={playlists} /> */}
		</div>
	);
};

export default App;
