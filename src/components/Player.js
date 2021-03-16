import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setCurrentTrackDuration,
	setTrackCurrentTime,
	setCurrentTrackIndex,
} from '../actions/playerActions';

import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import PlayListRoster from './PlayListRoster';

const Player = ({ setIsPlaying }) => {
	const dispatch = useDispatch();

	//access global state
	const land = useSelector((state) => state.player.land);
	const tracks = useSelector((state) => state.player.tracks);
	const isPlaying = useSelector((state) => state.player.isPlaying);

	const currentTrackIndex = useSelector(
		(state) => state.player.currentTrackIndex,
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
				src={tracks[currentTrackIndex].src}
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
						<div id='track-name'> {tracks[currentTrackIndex].title}</div>
						<div id='track-land'> {tracks[currentTrackIndex].land}</div>
					</div>
					<PlayerControls />
					<ProgressBar />
				</section>
			</section>

			<PlayListRoster
			//Have to pass audioEl as props because it can't get sent as an object to the store
				audioEl={audioEl}
			/>
		</>
	);
};

export default Player;
