export interface PlaybackState {
    isPlaying: boolean;
    duration: number;
    playedFraction: number;
}

export const PLAYBACK_PLAYING_STATE_CHANGED = 'PLAYBACK_PLAYING_STATE_CHANGED';
export const PLAYBACK_DURATION_CHANGED = 'PLAYBACK_DURATION_CHANGED';
export const PLAYBACK_PLAYED_FRACTION_CHANGED = 'PLAYBACK_PLAYED_FRACTION_CHANGED';

export interface PlaybackPlayingStateChanged {
    type: typeof PLAYBACK_PLAYING_STATE_CHANGED;
    payload: {
        isPlaying: boolean;
    };
}

export interface PlaybackDurationChanged {
    type: typeof PLAYBACK_DURATION_CHANGED;
    payload: {
        duration: number;
    };
}

export interface PlaybackPlayedFractionChanged {
    type: typeof PLAYBACK_PLAYED_FRACTION_CHANGED;
    payload: {
        playedFraction: number;
    };
}

export type PlaybackAction = PlaybackPlayingStateChanged | PlaybackDurationChanged | PlaybackPlayedFractionChanged;
