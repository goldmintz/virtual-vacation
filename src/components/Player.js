import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	advanceTrack,
	setCurrentTrackDuration,
	setTrackCurrentTime,
} from '../actions/playerActions';

import PlayerControls from './PlayerControls';
import PlayListRoster from './PlayListRoster';

const Player = ({ setCurrentTrackIndex, setIsPlaying }) => {
	const dispatch = useDispatch;

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

	// custom middleware
	const setDuration = () => {
		dispatch(setCurrentTrackDuration(audioEl.current.duration));
		console.log(audioEl.current.duration);
	};

	useEffect(() => {
		//check that audio should/shouldnt be playing
		isPlaying ? audioEl.current.play() : audioEl.current.pause();
	}, [isPlaying, audioEl]);

	// Begin Component Render
	return (
		<>
			<section className='player'>
				<img className='albumArt' src={image} alt={name} />

				<section className='control-center'>
					<div className='track-details'>
						<div id='track-name'> {tracks[currentTrackIndex].title}</div>
						<div id='track-land'> {tracks[currentTrackIndex].land}</div>
					</div>

					<audio
						src={tracks[currentTrackIndex].src}
						ref={audioEl}
						// onLoadedMetadata={() => {
						// 	dispatch(setCurrentTrackDuration(audioEl.current.duration));
						// }}
						// onTimeUpdate={() =>
						// 	// audioEl.current.currentTime
						// 	// on update, retrieve currentTime from ref and set time in state
						// dispatch((setTrackCurrentTime(audioEl.current.currentTime)))}
						//check for next track when audio ends
						// onEnded={() => dispatch(advanceTrack())}
					/>

					<PlayerControls />
				</section>
			</section>

			<PlayListRoster
				currentTrackIndex={currentTrackIndex}
				setCurrentTrackIndex={setCurrentTrackIndex}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				audioEl={audioEl}
			/>
		</>
	);
};

export default Player;
