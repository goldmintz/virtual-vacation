import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlayerControls from './PlayerControls';
import PlayListRoster from './PlayListRoster';

const Player = ({ currentTrackIndex, setCurrentTrackIndex, setIsPlaying }) => {
	const dispatch = useDispatch;
	const land = useSelector((state) => state.player.land);
	const trackList = useSelector((state) => state.player.tracks);
	const currentTrack = useSelector((state) => state.player.currentTrackIndex);
	const isInfinite = useSelector((state) => state.player.isInfinite);
	const isPlaying = useSelector((state) => state.player.isPlaying);

	//Destructure state for easy reference
	const { image, name } = land;

	//manage state for track duration, playthrough (normal, random, infinite) and play timer countdown
	const [trackDuration, setTrackDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const handleNextTrack = () => {
		const lastTrack =
			currentTrackIndex === trackList.length - 1 && currentTrackIndex !== 0;

		//if it's not the last track, move on to next index
		if (!lastTrack) {
			return setCurrentTrackIndex((currentTrackIndex) => currentTrackIndex + 1);
		}
		// //if it is the last track and playthru is normal, end on last song
		if (lastTrack && !isInfinite) {
			return setIsPlaying(!isPlaying);
		}
		//if it is the last track, but playthru is set to infinite, start over again
		if (lastTrack && isInfinite) {
			return setCurrentTrackIndex(() => 0);
		}
	};

	//manage progress bar % complete
	const [percentage, setPercentage] = useState(0);

	// calculate % song complete for progress bar
	const progressPerc = (currentTime / trackDuration) * 100;

	const audioEl = useRef(null);

	useEffect(() => {
		isPlaying ? audioEl.current.play() : audioEl.current.pause();
		//update perc as song plays
		setPercentage(progressPerc);
	}, [progressPerc, isPlaying, audioEl]);

	//turn the trackDuration and currentTime into something readable
	const formatTime = (seconds) => {
		return (
			[
				Math.floor(seconds / 60), // calculate whole minutes
				Math.floor(seconds % 60), //calculate remainder seconds (whatever is left over from dividing into minutes)
			]
				.map((el) => el.toString())

				//format to double digits
				.map((el) => (el.length === 1 ? `0${el}` : el))

				// join the result with a colon
				.join(':')
		);
	};

	//move through the track list (fwd, back) using controls
	const advanceTrack = (fwd = true) => {
		// if user clicks forward button
		if (fwd) {
			setCurrentTrackIndex(() => {
				//check if track is last on list, if last set index to 0 to restart playlist
				let nextIndex =
					currentTrackIndex === trackList.length - 1
						? 0
						: currentTrackIndex + 1;

				return nextIndex;
			});
			//if user clicks back button, just go backwards or reset to 0 if first track
		} else {
			setCurrentTrackIndex(() => {
				let prevIndex = currentTrackIndex === 0 ? 0 : currentTrackIndex - 1;

				return prevIndex;
			});
		}
		setIsPlaying(true);
	};

	// Begin Component Render
	return (
		<>
			<section className='player'>
				<img className='albumArt' src={image} alt={name} />

				<section className='control-center'>
					<div className='track-details'>
						<div id='track-name'> {trackList[currentTrackIndex].title}</div>
						<div id='track-land'> {trackList[currentTrackIndex].land}</div>
					</div>

					<audio
						src={trackList[currentTrackIndex].src}
						ref={audioEl}
						onLoadedMetadata={() => {
							setTrackDuration(audioEl.current.duration);
						}}
						onTimeUpdate={() => {
							// on update, retrieve currentTime from ref and set time in state,
							setCurrentTime(audioEl.current.currentTime);
						}}
						onEnded={() => handleNextTrack()}
					/>

					<div className='progress-bar-wrapper'>
						<div className='progress-bar-time'>{formatTime(currentTime)}</div>
						<div className='progress-bar'>
							<div id='progress-fill' style={{ width: `${percentage}%` }}></div>
						</div>
						<div className='progress-bar-time'>{formatTime(trackDuration)}</div>
					</div>

					<PlayerControls
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						advanceTrack={advanceTrack}
						currentTrackIndex={currentTrackIndex}
						tracks={trackList}
					/>
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
