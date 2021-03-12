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

	//manage play/pause/load
	const [isPlaying, setIsPlaying] = useState(false);
	
	return (
		<div className='app-wrapper'>
			<section className='player-wrapper'>
				<Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
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
