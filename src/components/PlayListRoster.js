import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	setTrackFromPlayList,
	addToFavoritesList,
} from '../actions/playerActions';

const PlayListRoster = () => {
	const dispatch = useDispatch();
	const land = useSelector((state) => state.player.land);
	const trackList = useSelector((state) => state.player.tracks);
	const favorites = useSelector((state) => state.player.favoritesPlayList);
	const currentTrackIndex = useSelector(
		(state) => state.player.currentTrackIndex,
	);

	console.log(favorites);

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
						}}>
						<span style={{ marginRight: '.5rem' }}>{i + 1}</span> {track.title}
						<span style={{ marginLeft: '.5rem' }}>
							{favorites.some((t) => t.title === track.title) ? (
								<i
									className='far fa-heart'
									onClick={() => dispatch(addToFavoritesList(track))}
								/>
							) : (
								<i className='fas fa-heart'></i>
							)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PlayListRoster;
