import { AppThunkAction } from '../types';
import { getPlaybackDuration } from './selectors';
import {
    PlaybackPlayingStateChanged,
    PlaybackDurationChanged,
    PlaybackPlayedFractionChanged,
    PLAYBACK_PLAYING_STATE_CHANGED,
    PLAYBACK_DURATION_CHANGED,
    PLAYBACK_PLAYED_FRACTION_CHANGED,
} from './types';

export const setIsPlaying = (isPlaying: boolean): PlaybackPlayingStateChanged => ({
    type: PLAYBACK_PLAYING_STATE_CHANGED,
    payload: { isPlaying },
});

export const setPlaybackDuration = (duration: number): PlaybackDurationChanged => ({
    type: PLAYBACK_DURATION_CHANGED,
    payload: { duration },
});

export const setPlaybackPlayedFraction = (playedFraction: number): PlaybackPlayedFractionChanged => ({
    type: PLAYBACK_PLAYED_FRACTION_CHANGED,
    payload: { playedFraction },
});

export const setPlaybackPlayedSeconds =
    (playedSeconds: number): AppThunkAction =>
    (dispatch, getState) => {
        const duration = getPlaybackDuration(getState());
        const playedFraction = Math.min(Math.max(0, playedSeconds / duration), 1);
        console.log({ duration, playedFraction });
        dispatch(setPlaybackPlayedFraction(playedFraction));
    };
