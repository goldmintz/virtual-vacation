import {
	SET_LANDS,
	SET_PLAYLIST,
	PLAY_TRACK,
	SET_TRACK,
} from '../constants/types.js';

// import tracklist array
import { lands } from '../lands';
import { tracks } from '../tracks';

export const setLands = () => (dispatch) => {
	//Find tracks based on land passed

	dispatch({
		type: SET_LANDS,
		payload: lands,
	});
};

export const getLand = (land) => (dispatch) => {
	//Find tracks based on land passed
	let filteredTracks = tracks.filter((track) => track.land === land.name);

	dispatch({
		type: SET_PLAYLIST,
		payload: { land, filteredTracks },
	});
};

export const nextTrack = (fwd = true) => (dispatch, getState) => {
	const state = getState();

	let nextIndex =
		state.player.currentTrackIndex === state.player.tracks.length - 1
			? 0
			: state.player.currentTrackIndex + 1;

	console.log(nextIndex);
	dispatch({
		type: SET_TRACK,
		payload: nextIndex,
	});

	// if user clicks forward button
	// if (fwd) {
	// 	let nextIndex =
	// 		state.player.currentTrackIndex === state.player.tracks.length - 1
	// 			? 0
	// 			: state.player.currentTrackIndex + 1;

	// 	console.log(nextIndex);
	// 	dispatch({
	// 		type: SET_CURRENT_TRACK,
	// 		payload: nextIndex,
	// 	});
	// 	setCurrentTrackIndex(() => {
	// 		//check if track is last on list, if last set index to 0 to restart playlist
	// 		let nextIndex =
	// 			currentTrackIndex === playlist.tracks.length - 1
	// 				? 0
	// 				: currentTrackIndex + 1;

	// 		return nextIndex;
	// 	});
	// 	//if user clicks back button, just go backwards or reset to 0 if first track
	// } else {
	// 	setCurrentTrackIndex(() => {
	// 		let prevIndex = currentTrackIndex === 0 ? 0 : currentTrackIndex - 1;

	// 		return prevIndex;
	// 	});
	// }
	dispatch({
		type: PLAY_TRACK,
	});
	// }
};

export const setTrack = (index) => (dispatch) => {
	dispatch({
		type: SET_TRACK,
		payload: index,
	});
};
