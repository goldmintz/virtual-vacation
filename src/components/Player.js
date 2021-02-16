import React, { useEffect, useState, useRef } from 'react';
import PlayerControls from './PlayerControls';

const Player = ({ playlist, currentTrackIndex, setCurrentTrackIndex }) => {
	const audioEl = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (isPlaying) {
			audioEl.current.play();
		} else {
			audioEl.current.pause();
		}
	});

	//used to show name of next track
	const nextTrackIndex =
		currentTrackIndex === playlist.tracks.length - 1
			? 0
			: currentTrackIndex + 1;

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
		<section className='player'>
			<img className='albumArt' src={playlist.land.image} alt={playlist.Land} />

			<section className='control-center'>
				<div className='track-details'>
					<div> {playlist.tracks[currentTrackIndex].title}</div>
					<div> {playlist.tracks[currentTrackIndex].land}</div>
				</div>

				<audio
					src={playlist.tracks[currentTrackIndex].src}
					ref={audioEl}></audio>

				<div class='progress-bar'>
					<span id='progress-fill'></span>
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
	);
};

export default Player;
