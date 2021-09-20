import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { PlaybackState, PlaybackAction } from './playback/types';

export interface State {
    playback: PlaybackState;
}

export type Action = PlaybackAction;

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppThunkDispatch = ThunkDispatch<State, {}, Action>;
