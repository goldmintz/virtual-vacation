import React, { useState, useEffect } from 'react';

const PlayListRoster = ({
	playlist,
	setCurrentTrackIndex,
	currentTrackIndex,
	isPlaying,
	setIsPlaying,
	audioEl,
}) => {
	//do not apply the active class to the first track upon initial render, only add if track is selected or is currently playing on tracklist
	const [initalLoad, setInitialLoad] = useState(true);
	useEffect(() => {
		if (isPlaying || currentTrackIndex !== 0) {
			setInitialLoad(false);
		}
	}, [isPlaying, currentTrackIndex]);

	console.log(currentTrackIndex);

	//define this outside of the render because audioEl loads initially as null
	const addCurrentTrackStyle = (i) => {
		if (
			!initalLoad &&
			i === currentTrackIndex &&
			audioEl.current != null &&
			(isPlaying || audioEl.current.paused)
		) {
			return 'current-track';
		} else {
			return '';
		}
	};

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
						className={'track-listing ' + addCurrentTrackStyle(i)}
						key={i}
						onClick={() => {
							setCurrentTrackIndex(i);
							setIsPlaying(true);
						}}>
						<span style={{ marginRight: '.5rem' }}>{i + 1}</span> {track.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default PlayListRoster;
