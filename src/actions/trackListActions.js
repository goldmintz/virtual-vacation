import {
	SET_LANDS,
	SET_TRACK,
	PAUSE_TRACK,
	SET_PLAYLIST,
	ADD_TO_FAVORITES,
} from '../constants/types.js';

// import tracklist array
import { lands } from '../lands';
import { tracks } from '../tracks';

// Fetch lands/playlists
export const setLands = () => (dispatch) => {
	dispatch({
		type: SET_LANDS,
		payload: lands,
	});
};

//Get tracks based on land selected
export const setTrackList = (land) => (dispatch, getState) => {
	const state = getState();
	const { isShuffle } = state.player;

	const trackList = isShuffle
		? tracks
				.filter((track) => track.land === land.name)
				.sort(() => Math.random() - 0.5)
		: tracks.filter((track) => track.land === land.name); //if shuffle is not selected, just find the land's tracks

	dispatch({
		type: SET_PLAYLIST,
		payload: { land, trackList },
	});
};

//Restart playlist from first track
//Used when new land is loaded (so newly loaded tracklist does not start at previously played track number)
export const resetPlayList = () => (dispatch) => {
	dispatch({
		type: SET_TRACK,
		payload: 0,
	});
};

//Set the track index clicked from playlist roster
export const setTrackFromPlayList = (i) => (dispatch) => {
	dispatch({
		type: SET_TRACK,
		payload: i,
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
			type: PAUSE_TRACK,
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

export const addToFavoritesList = (track) => (dispatch, getState) => {
	dispatch({
		type: ADD_TO_FAVORITES,
		payload: {
			title: track.title,
			src: track.src,
			land: track.land,
		},
	});

	localStorage.setItem(
		'favoritesPlayList',
		JSON.stringify(getState().favoritesPlayList),
	);
};
