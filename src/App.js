import React, { useState } from 'react';
import './App.css';

// import children
import PlaylistCard from './components/PlaylistCard';
import Player from './components/Player';

// import children/views
import FullScreen from './views/FullScreen';

// import tracklist array
import { tracks } from './tracks';
import { lands } from './lands';

const App = () => {
	//State Management
	//TODO: Select land at random on initial mount OR welcome message about the app
	const [playlist, setPlayList] = useState({
		land: {
			name: 'Enchanted Tiki Room',
			image: './images/tiki.jpg',
			summary: 'Whatever. This is just a temp placeholder',
		},
		tracks: [
			{
				title: 'Polynesian Resort - Complete Area Music',
				src: './audio/Polynesian Resort - Complete Area Music.mp3',
				land: 'Enchanted Tiki Room',
			},
		],
	});

	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	//manage play/pause/load
	const [isPlaying, setIsPlaying] = useState(false);

	const handleSetLand = (land) => {
		let filteredByLand = tracks.filter((track) => track.land === land.name);
		setPlayList({
			land,
			tracks: filteredByLand,
		});
	};

	return (
		<>
			<div className='app-wrapper'>
				
				<FullScreen
					playlist={playlist}
					currentTrackIndex={currentTrackIndex}
					setCurrentTrackIndex={setCurrentTrackIndex}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
				{ /*

				<section className='albums-wrapper'>
					{lands.map((land, i) => (
						<PlaylistCard
							key={land.name}
							land={land}
							handleSetLand={handleSetLand}
							setIsPlaying={setIsPlaying}
							setCurrentTrackIndex={setCurrentTrackIndex}
						/>
					))}
					</section> */}
			</div>
		</>
	);
};

export default App;
