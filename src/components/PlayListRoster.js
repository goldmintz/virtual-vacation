import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	setTrackFromPlayList,
	addToFavoritesList,
	removeFromFavoritesList,
} from '../actions/trackListActions';

const PlayListRoster = () => {
	const dispatch = useDispatch();
	const land = useSelector((state) => state.tracks.land);
	const trackList = useSelector((state) => state.tracks.trackList);
	const favoritesPlayList = useSelector((state) => state.favoritesPlayList);
	const currentTrackIndex = useSelector(
		(state) => state.tracks.currentTrackIndex,
	);

	const tracksToMap = land.name !== 'Favorites' ? trackList : favoritesPlayList;
	const favorites = localStorage.getItem('favoritesPlayList')
		? JSON.parse(localStorage.getItem('favoritesPlayList'))
		: [];

	const { image, name, summary } = land;

	useEffect(() => {}, [dispatch]);

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
				{tracksToMap.map((track, i) => (
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
									className='fas fa-heart'
									onClick={(e) => {
										e.stopPropagation(); //stop bubbling of setTrackFromPlaylist dispatch
										dispatch(removeFromFavoritesList(track));
									}}
								/>
							) : (
								<i
									className='far fa-heart'
									onClick={(e) => {
										e.stopPropagation(); //stop bubbling of setTrackFromPlaylist dispatch
										dispatch(addToFavoritesList(track));
									}}
								/>
							)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PlayListRoster;
