import React from 'react';

const PlayListRoster = ({ playlist, setCurrentTrackIndex }) => {
	return (
		<div className='playlist-roster'>
			<div className='album-summary'>
				<img
					id='playlist-thumbnail'
					src={playlist.land.image}
					alt={playlist.land.image}
				/>
				<div id='land-tagline'>
					Land summary goes here. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit. Maecenas orci neque, viverra id blandit at, elementum
					ac lacus. Nam blandit ultrices turpis ut maximus.
				</div>
			</div>
			{playlist.tracks.map((track, i) => (
				<div
					className='track-listing'
					key={i}
					onClick={() => setCurrentTrackIndex(i)}>
					<span>{i + 1}</span> {track.title}
				</div>
			))}
		</div>
	);
};

export default PlayListRoster;
