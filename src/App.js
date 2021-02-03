import React from 'react';
import './App.css';

// import children
import SlideShow from './components/SlideShow';
import Player from './components/Player';

const App = () => {
	return (
		<div className='page-wrapper'>
			<SlideShow />
			<Player />
		</div>
	);
};

export default App;
