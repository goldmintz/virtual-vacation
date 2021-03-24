import {
	SET_LANDS,
	SET_TRACK,
	PAUSE_TRACK,
	SET_PLAYLIST,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
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
	const faves = state.favoritesPlayList;

	const trackList = isShuffle
		? tracks
				.filter((track) => track.land === land.name)
				.sort(() => Math.random() - 0.5)
		: tracks.filter((track) => track.land === land.name); //if shuffle is not selected, just find the land's tracks

	const favesList = isShuffle ? faves.sort(() => Math.random() - 0.5) : faves;

	if (land.name !== 'Favorites') {
		dispatch({
			type: SET_PLAYLIST,
			payload: { land, trackList },
		});
	} else {
		dispatch({
			type: SET_PLAYLIST,
			payload: { land, favesList },
		});

		localStorage.setItem(
			'favoritesPlayList',
			JSON.stringify(getState().favoritesPlayList),
		);
	}
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

export const setNextTrackIndex = () => (dispatch, getState) => {
	const state = getState();
	const { trackList, currentTrackIndex, land } = state.tracks;
	const faves = state.favoritesPlayList;
	const { isInfinite } = state.player;

	const tracks = land.name !== 'Favorites' ? trackList : faves;

	// is the current track playing the last track on the playlist?
	let lastTrack = currentTrackIndex === tracks.length - 1;

	// if it's not the last track, move to next track
	if (!lastTrack) {
		dispatch({
			type: SET_TRACK,
			payload: currentTrackIndex + 1,
		});
		//if it's the last track and set to infinite playthru, start the list over
	} else if (lastTrack && isInfinite) {
		dispatch({
			type: SET_TRACK,
			payload: 0,
		});
	} //if it's the last track and not infinite playthru, stop at end of playlist
	else if (lastTrack && !isInfinite) {
		dispatch({
			type: PAUSE_TRACK,
		});
	}
};

export const addToFavoritesList = (track) => (dispatch, getState) => {
	const state = getState();

	let faveTracks = state.favoritesPlayList;
	let alreadyFave = faveTracks.some((t) => t.title === track.title);

	//only add tracks that are not already on the list
	if (!alreadyFave) {
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
	} else {
		return;
	}
};

export const removeFromFavoritesList = (track) => (dispatch, getState) => {
	dispatch({
		type: REMOVE_FROM_FAVORITES,
		payload: track.title,
	});
	localStorage.setItem(
		'favoritesPlayList',
		JSON.stringify(getState().favoritesPlayList),
	);
};
