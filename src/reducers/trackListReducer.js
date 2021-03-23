import {
	SET_LANDS,
	SET_PLAYLIST,
	SET_TRACK,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
} from '../constants/types.js';

const initialState = {
	lands: [],
	land: {
		name: 'Enchanted Tiki Room',
		image: './images/tiki.jpg',
		summary: 'Whatever. This is just a temp placeholder',
	},
	trackList: [
		{
			title: 'Crowing',
			src: './audio/Test_Crow.mp3',
			land: 'Enchanted Tiki Room',
		},
		{
			title: 'Magic Wand',
			src: './audio/Test_Wand.mp3',
			land: 'Enchanted Tiki Room',
		},
		{
			title: 'Jingle',
			src: './audio/Test_Jingle.mp3',
			land: 'Enchanted Tiki Room',
		},
		{
			title: 'Splash',
			src: './audio/Test_Splash.mp3',
			land: 'Enchanted Tiki Room',
		},
	],
	currentTrackIndex: 0,
};

export const trackListReducer = (state = initialState, action) => {
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
				trackList: action.payload.trackList,
			};
		case SET_TRACK:
			return {
				...state,
				currentTrackIndex: action.payload,
			};
		default:
			return state;
	}
};

export const favoritesReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_TO_FAVORITES:
			// let faveTrack = action.payload;
			//include '|| []' otherwise cannot spread initially empty array
			// return {
			// faveTracks: [...(state.faveTracks || []), action.payload],
			// };
			return [...(state || []), action.payload];
		case REMOVE_FROM_FAVORITES:
			//return a new array where no track names match the payload
			return state.filter((track) => track.title !== action.payload);
			

		default:
			return state;
	}
};
