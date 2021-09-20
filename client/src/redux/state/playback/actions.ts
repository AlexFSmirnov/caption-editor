import { AppThunkAction } from '../types';
import { getPlaybackDuration } from './selectors';
import {
    PlaybackPlayingStateChanged,
    PlaybackDurationChanged,
    PlaybackPlayedFractionChanged,
    PlaybackPlayingStateChangePending,
    PlaybackPendingSeekPushed,
    PlaybackPendingSeekPopped,
    PLAYBACK_PLAYING_STATE_CHANGED,
    PLAYBACK_DURATION_CHANGED,
    PLAYBACK_PLAYED_FRACTION_CHANGED,
    PLAYBACK_PLAYING_STATE_CHANGE_PENDING,
    PLAYBACK_PENDING_SEEK_PUSHED,
    PLAYBACK_PENDING_SEEK_POPPED,
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

const setIsPlayingPendingChange = (isPlaying: boolean | null): PlaybackPlayingStateChangePending => ({
    type: PLAYBACK_PLAYING_STATE_CHANGE_PENDING,
    payload: { isPlayingPendingChange: isPlaying },
});

export const requestIsPlaying = (isPlaying: boolean) => setIsPlayingPendingChange(isPlaying);
export const clearIsPlayingRequest = () => setIsPlayingPendingChange(null);

export const pushPendingSeek = (seekToFraction: number): PlaybackPendingSeekPushed => ({
    type: PLAYBACK_PENDING_SEEK_PUSHED,
    payload: { seekToFraction },
});

export const popPendingSeek = (): PlaybackPendingSeekPopped => ({
    type: PLAYBACK_PENDING_SEEK_POPPED,
});

export const setPlaybackPlayedSeconds =
    (playedSeconds: number): AppThunkAction =>
    (dispatch, getState) => {
        const duration = getPlaybackDuration(getState());
        const playedFraction = Math.min(Math.max(0, playedSeconds / duration), 1);
        console.log({ duration, playedFraction });
        dispatch(setPlaybackPlayedFraction(playedFraction));
    };
