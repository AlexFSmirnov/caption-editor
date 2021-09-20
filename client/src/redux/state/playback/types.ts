export interface PlaybackState {
    isPlaying: boolean;
    duration: number;
    playedFraction: number;
    isPlayingPendingChange: boolean | null;
    pendingSeeks: number[];
}

export const PLAYBACK_PLAYING_STATE_CHANGED = 'PLAYBACK_PLAYING_STATE_CHANGED';
export const PLAYBACK_DURATION_CHANGED = 'PLAYBACK_DURATION_CHANGED';
export const PLAYBACK_PLAYED_FRACTION_CHANGED = 'PLAYBACK_PLAYED_FRACTION_CHANGED';
export const PLAYBACK_PLAYING_STATE_CHANGE_PENDING = 'PLAYBACK_PLAYING_STATE_CHANGE_PENDING';
export const PLAYBACK_PENDING_SEEK_PUSHED = 'PLAYBACK_PENDING_SEEK_PUSHED';
export const PLAYBACK_PENDING_SEEK_POPPED = 'PLAYBACK_PENDING_SEEK_POPPED';

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

export interface PlaybackPlayingStateChangePending {
    type: typeof PLAYBACK_PLAYING_STATE_CHANGE_PENDING;
    payload: {
        isPlayingPendingChange: boolean | null;
    };
}

export interface PlaybackPendingSeekPushed {
    type: typeof PLAYBACK_PENDING_SEEK_PUSHED;
    payload: {
        seekToFraction: number;
    };
}

export interface PlaybackPendingSeekPopped {
    type: typeof PLAYBACK_PENDING_SEEK_POPPED;
}

export type PlaybackAction =
    | PlaybackPlayingStateChanged
    | PlaybackDurationChanged
    | PlaybackPlayedFractionChanged
    | PlaybackPlayingStateChangePending
    | PlaybackPendingSeekPushed
    | PlaybackPendingSeekPopped;
