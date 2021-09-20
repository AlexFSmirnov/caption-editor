import {
    PlaybackState,
    PlaybackAction,
    PLAYBACK_PLAYING_STATE_CHANGED,
    PLAYBACK_DURATION_CHANGED,
    PLAYBACK_PLAYED_FRACTION_CHANGED,
    PLAYBACK_PLAYING_STATE_CHANGE_PENDING,
    PLAYBACK_PENDING_SEEK_PUSHED,
    PLAYBACK_PENDING_SEEK_POPPED,
} from './types';

export const playbackInitialState: PlaybackState = {
    isPlaying: false,
    duration: 0,
    playedFraction: 0,
    isPlayingPendingChange: null,
    pendingSeeks: [],
};

export const playbackReducer = (state = playbackInitialState, action: PlaybackAction) => {
    switch (action.type) {
        case PLAYBACK_PLAYING_STATE_CHANGED:
        case PLAYBACK_DURATION_CHANGED:
        case PLAYBACK_PLAYED_FRACTION_CHANGED:
        case PLAYBACK_PLAYING_STATE_CHANGE_PENDING:
            return { ...state, ...action.payload };

        case PLAYBACK_PENDING_SEEK_PUSHED:
            return {
                ...state,
                pendingSeeks: [...state.pendingSeeks, action.payload.seekToFraction],
            };

        case PLAYBACK_PENDING_SEEK_POPPED:
            return {
                ...state,
                pendingSeeks: state.pendingSeeks.slice(1),
            };

        default:
            return state;
    }
};
