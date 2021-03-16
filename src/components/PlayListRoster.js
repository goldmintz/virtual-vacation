import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setTrackFromPlayList } from '../actions/playerActions';

const PlayListRoster = ({ setIsPlaying }) => {
	const dispatch = useDispatch();
	const land = useSelector((state) => state.player.land);
	const trackList = useSelector((state) => state.player.tracks);
	const currentTrackIndex = useSelector(
		(state) => state.player.currentTrackIndex,
	);

	const { image, name, summary } = land;
	return (
		<div className='playlist-roster'>
			<div className='album-summary'>
				<img id='playlist-thumbnail' src={image} alt={name} />
				<div id='land-tagline'>
					<div style={{ marginBottom: '.25rem' }}>
						<strong>{name}</strong>
					</div>
					{summary}
				</div>
			</div>

			<div className='tracklist-wrapper'>
				{trackList.map((track, i) => (
					<div
						className={
							'track-listing ' +
							(i === currentTrackIndex ? 'current-track' : '')
						}
						key={i}
						onClick={() => {
							dispatch(setTrackFromPlayList(i));
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
