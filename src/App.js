import React, { useState, useEffect } from 'react';
import './App.css';

// import children
import PlaylistCard from './components/PlaylistCard';
import Player from './components/Player';

// import tracklist array
import { tracks } from './tracks';
import { lands } from './lands';

const App = () => {
	//State Management
	const [playlist, setPlayList] = useState({
		land: { name: 'Polynesian Resort', image: './images/tropical.jpg' },
		tracks: [
			{
				title: 'Polynesian Resort - Complete Area Music',
				src: './audio/Polynesian Resort - Complete Area Music.mp3',
				land: 'Polynesian Resort',
			},
		],
	});
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

	const handleSetLand = (land) => {
		let landTracks = [];
		let t = tracks.find((track) => track.land === land.name);
		landTracks.push(t);
		setPlayList({
			land,
			tracks: landTracks,
		});
	};

	return (
		<div className='app-wrapper'>
			<div className='player'>
				<Player
					playlist={playlist}
					currentTrackIndex={currentTrackIndex}
					setCurrentTrackIndex={setCurrentTrackIndex}
				/>
			</div>
			<div className='albums'>
				{lands.map((land, i) => (
					<PlaylistCard land={land} handleSetLand={handleSetLand} key={i} />
				))}
			</div>
		</div>
	);
};

export default App;
