import {
	SET_TRACK,
	SET_TRACK_DURATION,
	SET_TRACK_CURRENT_TIME,
	SET_VOLUME,
} from '../constants/types.js';

export const advanceTrack = (fwd = true) => (dispatch, getState) => {
	const state = getState();

	const { currentTrackIndex, trackList } = state.tracks;
	const { name } = state.tracks.land;
	const faves = state.favoritesPlayList;

	const tracks = name !== 'Favorites' ? trackList : faves;

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

		//if user clicks back button, just go backwards (if first track, back button is disabled in UI)
	} else {
		dispatch({
			type: SET_TRACK,
			payload: prevIndex,
		});
	}
};

export const setCurrentTrackDuration = (duration) => (dispatch) => {
	dispatch({
		type: SET_TRACK_DURATION,
		payload: duration,
	});
};

export const setTrackCurrentTime = (currentTime) => (dispatch) => {
	dispatch({
		type: SET_TRACK_CURRENT_TIME,
		payload: currentTime,
	});
};

export const setVolume = (volume) => (dispatch) => {
	dispatch({
		type: SET_VOLUME,
		payload: volume,
	});
};
