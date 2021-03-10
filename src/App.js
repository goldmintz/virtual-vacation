import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLands } from './actions/playerActions';
import './App.css';

// import children
import PlaylistCard from './components/PlaylistCard';
import Player from './components/Player';

const App = () => {
	const dispatch = useDispatch();
	const lands = useSelector((state) => state.player.lands);

	useEffect(() => {
		//set lands on load
		dispatch(setLands());
	}, [dispatch]);

	//State Management
	//TODO: Select land at random on initial mount OR welcome message about the app
	// const [playlist, setPlayList] = useState({
	// 	land: {
	// 		name: 'Enchanted Tiki Room',
	// 		image: './images/tiki.jpg',
	// 		summary: 'Whatever. This is just a temp placeholder',
	// 	},
	// 	tracks: [
	// 		{
	// 			title: 'Polynesian Resort - Complete Area Music',
	// 			src: './audio/Polynesian Resort - Complete Area Music.mp3',
	// 			land: 'Enchanted Tiki Room',
	// 		},
	// 	],
	// });

	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	//manage play/pause/load
	const [isPlaying, setIsPlaying] = useState(false);

	// const handleSetLand = (land) => {
	// 	let filteredByLand = tracks.filter((track) => track.land === land.name);
	// 	setPlayList({
	// 		land,
	// 		tracks: filteredByLand,
	// 	});
	// };

	return (
		<div className='app-wrapper'>
			<section className='player-wrapper'>
				<Player
					currentTrackIndex={currentTrackIndex}
					setCurrentTrackIndex={setCurrentTrackIndex}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
			</section>

			<section className='albums-wrapper'>
				{lands.map((land, i) => (
					<PlaylistCard key={i} land={land} />
				))}
			</section>
		</div>
	);
};

export default App;
