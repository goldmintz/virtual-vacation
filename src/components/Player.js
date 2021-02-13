import React, { useEffect, useState, useRef } from 'react';
// import PlaylistCard from './PlaylistCard';

const Player = ({ tracks, currentTrack, currentTrackIndex }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const { title, land, src } = currentTrack;

	const audioEl = useRef(null);
	const playTrack = () => {
		audioEl.current.play();
	};

	useEffect(() => {
		if (isPlaying) {
			audioEl.current.play();
		} else {
			audioEl.current.pause();
		}
	});

	return (
		<div className='player'>
			<div className='player-wrapper'>
				<div className='player-controls-wrapper'>
					{title}: <strong>{land}</strong>
					{/* Music Player Controls : Play/Pause, Fwd, and Back */}
					<div className='player-controls'>
						<button className='back-btn'>
							<i className='fas fa-backward'></i>
						</button>
						<button className='play-btn'>
							<i
								className={`fas fa-${isPlaying ? 'play' : 'pause'}`}
								onClick={() => console.log(audioEl.current.src)}></i>
						</button>
						<button className='next-btn'>
							<i className='fas fa-forward'></i>
						</button>
					</div>
					<audio src={src} ref={audioEl} controls></audio>
					<p>
						<strong>next up...</strong> {tracks[currentTrackIndex + 1].title}
					</p>
				</div>
				{/* <div className='playlist-wrapper'>
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
					<PlaylistCard />
							</div> */}
			</div>
		</div>
	);
};

export default Player;
