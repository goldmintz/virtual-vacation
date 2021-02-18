import React, { useState, useRef } from 'react';
import './App.css';

// import children
import PlaylistCard from './components/PlaylistCard';
import Player from './components/Player';
import PlayListRoster from './components/PlayListRoster';

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

	const handleSetLand = (land) => {
		let filteredByLand = tracks.filter((track) => track.land === land.name);

		setPlayList({
			land,
			tracks: filteredByLand,
		});
	};

	const audioEl = useRef(null);
	return (
		<div className='app-wrapper'>
			<section className='player-wrapper'>
				<Player
					audioEl={audioEl}
					playlist={playlist}
					currentTrackIndex={currentTrackIndex}
					setCurrentTrackIndex={setCurrentTrackIndex}
				/>

				<PlayListRoster
					audioEl={audioEl}
					playlist={playlist}
					currentTrackIndex={currentTrackIndex}
					setCurrentTrackIndex={setCurrentTrackIndex}
				/>
			</section>

			<section className='albums-wrapper'>
				{lands.map((land, i) => (
					<PlaylistCard land={land} handleSetLand={handleSetLand} key={i} />
				))}

				{/* TODO: Remove these extra maps- just here to fill out wrapper with content */}
				{lands.map((land, i) => (
					<PlaylistCard land={land} handleSetLand={handleSetLand} key={i} />
				))}
				{lands.map((land, i) => (
					<PlaylistCard land={land} handleSetLand={handleSetLand} key={i} />
				))}
				{lands.map((land, i) => (
					<PlaylistCard land={land} handleSetLand={handleSetLand} key={i} />
				))}
			</section>
		</div>
	);
};

export default App;
