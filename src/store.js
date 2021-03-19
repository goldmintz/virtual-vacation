import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { playerReducer } from './reducers/playerReducer';
import {
	trackListReducer,
	favoritesReducer,
} from './reducers/trackListReducer';

//Starting with a single reducer, might break apart into tracks/controls if grows
const reducer = combineReducers({
	player: playerReducer,
	tracks: trackListReducer,
	favoritesPlayList: favoritesReducer,
});

const favoritesPlayListFromLclStorage = localStorage.getItem(
	'favoritesPlayList',
)
	? JSON.parse(localStorage.getItem('favoritesPlayList'))
	: [];

const initialState = {
	favoritesPlayList: favoritesPlayListFromLclStorage,
};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
