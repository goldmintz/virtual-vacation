import React, { useEffect, useState, useRef } from 'react';
import PlayerControls from './PlayerControls';
import PlaylistCard from './PlaylistCard';

const Player = ({ tracks, currentTrackIndex, setCurrentTrackIndex }) => {
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
		currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;

	const advanceTrack = (fwd = true) => {
		// if user clicks forward button
		if (fwd) {
			setCurrentTrackIndex(() => {
				//check if track is last on list, if last set index to 0 to restart playlist
				let nextIndex =
					currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;

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
	return (
		<div className='player'>
			<section>
				<img
					src={tracks[currentTrackIndex].imgSrc}
					style={{ height: '300px' }}
				/>
				<div className='title-wrapper'>
					<div className='trackname-ticker'>
						<p>{tracks[currentTrackIndex].title}</p>
					</div>
				</div>
				{tracks[currentTrackIndex].land}
				<PlayerControls
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					advanceTrack={advanceTrack}
					currentTrackIndex={currentTrackIndex}
				/>
				<audio src={tracks[currentTrackIndex].src} ref={audioEl}></audio>
				<strong>next up...</strong> {tracks[nextTrackIndex].title}
			</section>
		</div>
	);
};

export default Player;
