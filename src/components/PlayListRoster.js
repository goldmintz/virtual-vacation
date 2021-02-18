import React from 'react';

const PlayListRoster = ({
	playlist,
	setCurrentTrackIndex,
	currentTrackIndex,
	audioEl,
}) => {
	return (
		<div className='playlist-roster'>
			<div className='album-summary'>
				<img
					id='playlist-thumbnail'
					src={playlist.land.image}
					alt={playlist.land.image}
				/>
				<div id='land-tagline'>
					<div style={{ marginBottom: '.25rem' }}>
						<strong>{playlist.land.name}</strong>
					</div>
					{playlist.land.summary}
				</div>
			</div>

			<div className='tracklist-wrapper'>
				{playlist.tracks.map((track, i) => (
					<div
						className={'track-listing ' + null}
						key={i}
						onClick={() => setCurrentTrackIndex(i)}>
						<span style={{ marginRight: '.5rem' }}>{i + 1}</span> {track.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default PlayListRoster;
