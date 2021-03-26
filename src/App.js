import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLands, setRandomLand } from './actions/trackListActions';
import './App.css';

// import children
import PlaylistCard from './components/PlaylistCard';
import Player from './components/Player';

const App = () => {
	const dispatch = useDispatch();
	const lands = useSelector((state) => state.tracks.lands);

	useEffect(() => {
		//set lands on load
		dispatch(setLands());
		//set playlist to random
		dispatch(setRandomLand());
	}, [dispatch]);

	return (
		<div className='app-wrapper'>
			<section className='player-wrapper'>
				<Player />
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
