import {
	SET_LANDS,
	SET_PLAYLIST,
	INFINITE_PLAY,
	PLAY_TRACK,
	SET_TRACK,
	SET_TRACK_DURATION,
	SET_TRACK_CURRENT_TIME,
} from '../constants/types.js';

const initialState = {
	isPlaying: false,
	isInfinite: false, //Set whether playlist ends on last song (normal) or loops (infinite)
	currentTrackIndex: 0,
	lands: [],
	//TODO: Update to fetch random land on initial load
	land: {
		name: 'Enchanted Tiki Room',
		image: './images/tiki.jpg',
		summary: 'Whatever. This is just a temp placeholder',
	},
	tracks: [
		{
			title: 'Polynesian Resort - Complete Area Music',
			src: './audio/Polynesian Resort - Complete Area Music.mp3',
			land: 'Enchanted Tiki Room',
		},
	],
	trackDuration: 0,
	currentTime: 0,
};

export const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LANDS:
			return {
				...state,
				lands: action.payload,
			};
		case SET_PLAYLIST:
			return {
				...state,
				land: action.payload.land,
				tracks: action.payload.filteredTracks,
			};
		case PLAY_TRACK:
			return {
				...state,
				isPlaying: !state.isPlaying,
			};
		case SET_TRACK:
			return {
				...state,
				currentTrackIndex: action.payload,
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

		default:
			return state;
	}
};
