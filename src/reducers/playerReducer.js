import {
	INFINITE_PLAY,
	SHUFFLE_PLAY,
	PLAY_TRACK,
	PAUSE_TRACK,
	SET_TRACK_DURATION,
	SET_TRACK_CURRENT_TIME,
} from '../constants/types.js';

const initialState = {
	isPlaying: false,
	isInfinite: false, //Set whether playlist ends on last song (normal) or loops (infinite)
	isShuffle: false, //Set track order to be random instead of increment +1
	currentTrackIndex: 0,
	trackDuration: null,
	currentTime: null,
};

export const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case PLAY_TRACK:
			return {
				...state,
				isPlaying: true,
			};
		case PAUSE_TRACK:
			return {
				...state,
				isPlaying: false,
			};
		case SET_TRACK_DURATION:
			return {
				...state,
				trackDuration: action.payload,
			};
		case SET_TRACK_CURRENT_TIME:
			return {
				...state,
				currentTime: action.payload,
			};
		case INFINITE_PLAY:
			return {
				...state,
				isInfinite: !state.isInfinite,
			};
		case SHUFFLE_PLAY:
			return {
				...state,
				isShuffle: !state.isShuffle,
			};

		default:
			return state;
	}
};
