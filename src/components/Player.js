import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	setCurrentTrackDuration,
	setTrackCurrentTime,
} from '../actions/playerActions';
import { setNextTrackIndex } from '../actions/trackListActions';

import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import PlayListRoster from './PlayListRoster';

const Player = () => {
	const dispatch = useDispatch();

	//access global state
	const land = useSelector((state) => state.tracks.land);
	const trackList = useSelector((state) => state.tracks.trackList);
	const isPlaying = useSelector((state) => state.player.isPlaying);
	const favoritesPlayList = useSelector((state) => state.favoritesPlayList);
	const audioVolume = useSelector((state) => state.player.volume);

	const tracks = land.name !== 'Favorites' ? trackList : favoritesPlayList;

	const currentTrackIndex = useSelector(
		(state) => state.tracks.currentTrackIndex,
	);

	//Destructure land state for easy reference
	const { image, name } = land;

	const audioEl = useRef(null);

	useEffect(() => {
		//check that audio is not null and should/shouldn't be playing

		if (audioEl.current !== null && isPlaying) {
			audioEl.current.play();
		} else if (audioEl.current !== null && !isPlaying) {
			audioEl.current.pause();
		}
	}, [isPlaying, audioEl, currentTrackIndex, dispatch]);

	// Begin Component Render
	return (
		<>
			{tracks.length !== 0 ? (
				<>
					<audio
						src={tracks[currentTrackIndex].src}
						ref={audioEl}
						volume={audioVolume}
						onLoadedMetadata={() =>
							dispatch(setCurrentTrackDuration(audioEl.current.duration))
						}
						onTimeUpdate={() =>
							// on update, retrieve currentTime from ref and set time in globalstate
							dispatch(setTrackCurrentTime(audioEl.current.currentTime))
						}
						onEnded={() => dispatch(setNextTrackIndex())}
						onVolumeChange={() => console.log('audio changed')}
					/>
					<section className='player'>
						<img className='albumArt' src={image} alt={name} />

						<section className='control-center'>
							<div className='track-details'>
								<div id='track-name'> {tracks[currentTrackIndex].title}</div>
								<div id='track-land'>{tracks[currentTrackIndex].land}</div>
							</div>
							<ProgressBar />
							<PlayerControls audioEl={audioEl} />
						</section>
					</section>
				</>
			) : (
				<section className='player'>
					<img className='albumArt' src={image} alt={name} />
				</section>
			)}

			<PlayListRoster
				audioEl={audioEl} //Have to pass audioEl as props because it can't get sent as an object to the store
			/>
		</>
	);
};

export default Player;
