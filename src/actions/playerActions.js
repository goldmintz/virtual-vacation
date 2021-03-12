import {
	SET_LANDS,
	SET_PLAYLIST,
	PLAY_TRACK,
	SET_TRACK,
	SET_TRACK_DURATION,
	SET_TRACK_CURRENT_TIME,
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

export const advanceTrack = (fwd = true) => (dispatch, getState) => {
	const state = getState();

	const { currentTrackIndex, tracks } = state.player;
	const nextIndex =
		currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;

	const prevIndex = currentTrackIndex === 0 ? 0 : currentTrackIndex - 1;

	//move through the track list (fwd, back) using controls
	// if user clicks forward button
	if (fwd) {
		dispatch({
			type: SET_TRACK,
			payload: nextIndex,
		});

		//if user clicks back button, just go backwards or reset to 0 if first track
	} else {
		dispatch({
			type: SET_TRACK,
			payload: prevIndex,
		});
	}
	dispatch({
		type: PLAY_TRACK,
	});
};

export const resetPlayList = () => (dispatch) => {
	dispatch({
		type: SET_TRACK,
		payload: 0,
	});
};

export const setCurrentTrackIndex = () => (dispatch, getState) => {
	const state = getState();

	const { currentTrackIndex, tracks, isInfinite } = state.player;

	//check if current track is the last in the playlist
	let lastTrack =
		currentTrackIndex === tracks.length - 1 && currentTrackIndex !== 0;

	//if it's not the last track, move on to next index
	if (!lastTrack) {
		dispatch({
			type: SET_TRACK,
			payload: currentTrackIndex + 1,
		});
	}
	//if it is the last track and playthru is normal, end on last song
	if (lastTrack && !isInfinite) {
		dispatch({
			// return setIsPlaying(!isPlaying);
			type: PLAY_TRACK,
		});
	}
	//if it is the last track, but playthru is set to infinite, start over again
	if (lastTrack && isInfinite) {
		dispatch({
			type: SET_TRACK,
			payload: 0,
		});
	}
};

export const setCurrentTrackDuration = (duration) => (dispatch) => {
	console.log(duration);
	// dispatch({
	// 	type: SET_TRACK_DURATION,
	// 	payload: duration,
	// });
};

export const setTrackCurrentTime = (currentTime) => (dispatch) => {
	dispatch({
		type: SET_TRACK_CURRENT_TIME,
		payload: currentTime,
	});
};
