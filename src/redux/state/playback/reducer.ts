import { PlaybackState, PlaybackAction, PLAYBACK_PLAYING_STATE_CHANGED, PLAYBACK_DURATION_CHANGED, PLAYBACK_PLAYED_FRACTION_CHANGED } from './types';

export const playbackInitialState: PlaybackState = {
    isPlaying: false,
    duration: 0,
    playedFraction: 0,
};

export const playbackReducer = (state = playbackInitialState, action: PlaybackAction) => {
    switch (action.type) {
        case PLAYBACK_PLAYING_STATE_CHANGED:
        case PLAYBACK_DURATION_CHANGED:
        case PLAYBACK_PLAYED_FRACTION_CHANGED:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};
