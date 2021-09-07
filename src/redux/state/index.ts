import { combineReducers } from 'redux';
import { playbackReducer } from './playback/reducer';

export const rootReducer = combineReducers({
    playback: playbackReducer,
});
