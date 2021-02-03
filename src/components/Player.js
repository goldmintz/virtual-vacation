import React from 'react';
import PlaylistCard from './PlaylistCard';

const Player = () => {
	return (
		<div class='player'>
			<div>WORLD/LAND TOGGLE</div>
			<div className='player-wrapper'>
				<div className='player-controls'>
					<h1>I am the track listing</h1>
					<h2>I am the player controls</h2>
				</div>
				<div className='playlist-wrapper'>
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
				</div>
			</div>
		</div>
	);
};

export default Player;
