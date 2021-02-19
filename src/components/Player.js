import React, { useEffect, useState, useRef } from 'react';
import PlayerControls from './PlayerControls';
import PlayListRoster from './PlayListRoster';

const Player = ({
	playlist,
	currentTrackIndex,
	setCurrentTrackIndex,
	isPlaying,
	setIsPlaying,
}) => {
	//manage state for track duration and play countdown
	const [trackDuration, setTrackDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	//manage progress bar % complete
	const [percentage, setPercentage] = useState(0);

	// calculate % song complete for progress bar
	const progressPerc = (currentTime / trackDuration) * 100;

	const audioEl = useRef(null);

	useEffect(() => {
		isPlaying ? audioEl.current.play() : audioEl.current.pause();
		//update perc as song plays
		setPercentage(progressPerc);
	}, [progressPerc, isPlaying]);

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
					currentTrackIndex === playlist.tracks.length - 1
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
				<img
					className='albumArt'
					src={playlist.land.image}
					alt={playlist.Land}
				/>

				<section className='control-center'>
					<div className='track-details'>
						<div id='track-name'>
							{' '}
							{playlist.tracks[currentTrackIndex].title}
						</div>
						<div id='track-land'>
							{' '}
							{playlist.tracks[currentTrackIndex].land}
						</div>
					</div>

					<audio
						src={playlist.tracks[currentTrackIndex].src}
						ref={audioEl}
						onLoadedMetadata={() => {
							setTrackDuration(audioEl.current.duration);
						}}
						onTimeUpdate={() => {
							// on update, retrieve currentTime from ref and set time in state,
							setCurrentTime(audioEl.current.currentTime);
						}}
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
					/>
				</section>
				{/* <strong>next up...</strong> {playlist.tracks[nextTrackIndex].title} */}
			</section>

			<PlayListRoster
				playlist={playlist}
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
