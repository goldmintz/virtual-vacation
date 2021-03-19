import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setCurrentTrackDuration,
	setTrackCurrentTime,
} from '../actions/playerActions';

import { setCurrentTrackIndex } from '../actions/trackListActions';

import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import PlayListRoster from './PlayListRoster';

const Player = () => {
	const dispatch = useDispatch();

	//access global state
	const land = useSelector((state) => state.tracks.land);
	const trackList = useSelector((state) => state.tracks.trackList);
	const isPlaying = useSelector((state) => state.player.isPlaying);

	const currentTrackIndex = useSelector(
		(state) => state.tracks.currentTrackIndex,
	);

	//Destructure land state for easy reference
	const { image, name } = land;

	const audioEl = useRef(null);

	useEffect(() => {
		//check that audio should/shouldn't be playing
		isPlaying ? audioEl.current.play() : audioEl.current.pause();
	}, [isPlaying, audioEl, currentTrackIndex, dispatch]);

	// Begin Component Render
	return (
		<>
			<audio
				src={trackList[currentTrackIndex].src}
				ref={audioEl}
				onLoadedMetadata={() =>
					dispatch(setCurrentTrackDuration(audioEl.current.duration))
				}
				onTimeUpdate={() =>
					// on update, retrieve currentTime from ref and set time in globalstate
					dispatch(setTrackCurrentTime(audioEl.current.currentTime))
				}
				onEnded={() => dispatch(setCurrentTrackIndex())}
			/>
			<section className='player'>
				<img className='albumArt' src={image} alt={name} />

				<section className='control-center'>
					<div className='track-details'>
						<div id='track-name'> {trackList[currentTrackIndex].title}</div>
						<div id='track-land'> {trackList[currentTrackIndex].land}</div>
					</div>
					<ProgressBar />
					<PlayerControls />
				</section>
			</section>

			<PlayListRoster
				audioEl={audioEl} //Have to pass audioEl as props because it can't get sent as an object to the store
			/>
		</>
	);
};

export default Player;
