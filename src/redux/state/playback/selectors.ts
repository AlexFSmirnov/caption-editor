import { createSelector } from 'reselect';
import { State } from '../types';

export const getPlaybackState = (state: State) => state.playback;

export const getIsPlaying = createSelector(getPlaybackState, playbackState => playbackState.isPlaying);
export const getPlaybackDuration = createSelector(getPlaybackState, playbackState => playbackState.duration);
export const getPlayedFraction = createSelector(getPlaybackState, playbackState => playbackState.playedFraction);
