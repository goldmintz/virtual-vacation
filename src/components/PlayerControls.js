import React, { useState } from 'react';

const PlayerControls = () => {
	const [playToggle, setPlayToggle] = useState('play');
	return (
		<div className='player-controls'>
			<button className='back-btn'>
				<i className='fas fa-backward'></i>
			</button>
			<button className='play-btn'>
				<i className={`fas fa-${playToggle}`}></i>
			</button>
			<button className='next-btn'>
				<i className='fas fa-forward'></i>
			</button>
		</div>
	);
};

export default PlayerControls;
