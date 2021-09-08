import { createSelector } from 'reselect';
import { State } from '../types';

export const getPlaybackState = (state: State) => state.playback;

export const getIsPlaying = createSelector(getPlaybackState, playbackState => playbackState.isPlaying);
export const getPlaybackDuration = createSelector(getPlaybackState, playbackState => playbackState.duration);
export const getPlayedFraction = createSelector(getPlaybackState, playbackState => playbackState.playedFraction);
export const getIsPlayingPendingChange = createSelector(getPlaybackState, playbackState => playbackState.isPlayingPendingChange);
export const getPendingSeeks = createSelector(getPlaybackState, playbackState => playbackState.pendingSeeks);

export const getLatestPendingSeek = createSelector(getPendingSeeks, pendingSeeks => (pendingSeeks.length > 0 ? pendingSeeks[0] : null));
