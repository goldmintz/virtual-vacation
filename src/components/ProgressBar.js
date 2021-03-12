import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
	//manage local state for track duration, playthrough (normal, random, infinite) and play timer countdown
	const [trackDuration, setTrackDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [percentage, setPercentage] = useState(0);

	// calculate % song complete for progress bar
	const progressPerc = (currentTime / trackDuration) * 100;

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

	useEffect(() => {
		//check that audio should/shouldnt be playing
		//update perc as song plays
		setPercentage(progressPerc);
	}, [progressPerc]);

	return (
		<div className='progress-bar-wrapper'>
			<div className='progress-bar-time'>{formatTime(currentTime)}</div>
			<div className='progress-bar'>
				<div id='progress-fill' style={{ width: `${percentage}%` }}></div>
			</div>
			<div className='progress-bar-time'>{formatTime(trackDuration)}</div>
		</div>
	);
};

export default ProgressBar;
