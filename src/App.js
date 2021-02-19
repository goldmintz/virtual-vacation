import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// import children
import PlaylistCard from './components/PlaylistCard';
import Player from './components/Player';

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

	const prevLand = usePrevious(playlist.land.name);
	console.log(`current: ${playlist.land.name}`, `previous: ${prevLand}`);

	// Hook
	function usePrevious(value) {
		// The ref object is a generic container whose current property is mutable ...
		// ... and can hold any value, similar to an instance property on a class
		const ref = useRef('Enchanted Tiki Room');

		// Store current value in ref
		useEffect(() => {
			ref.current = value;
		}, [value]); // Only re-run if value changes

		// Return previous value (happens before update in useEffect above)
		return ref.current;
	}

	const handleSetLand = (land) => {
		let filteredByLand = tracks.filter((track) => track.land === land.name);
		setPlayList({
			land,
			tracks: filteredByLand,
		});
	};

	return (
		<div className='app-wrapper'>
			<section className='player-wrapper'>
				<Player
					playlist={playlist}
					currentTrackIndex={currentTrackIndex}
					setCurrentTrackIndex={setCurrentTrackIndex}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
			</section>

			<section className='albums-wrapper'>
				{lands.map((land, i) => (
					<PlaylistCard
						key={land.name}
						land={land}
						handleSetLand={handleSetLand}
						setIsPlaying={setIsPlaying}
					/>
				))}
			</section>
		</div>
	);
};

export default App;
