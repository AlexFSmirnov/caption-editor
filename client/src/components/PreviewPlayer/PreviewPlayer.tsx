import { useRef, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { State } from '../../redux/types';
import { setPlaybackPlayedSeconds, setPlaybackDuration, setIsPlaying, clearIsPlayingRequest, popPendingSeek } from '../../redux/actions';
import { getIsPlayingPendingChange, getLatestPendingSeek } from '../../redux/selectors';
import { useResizeObserver } from '../../common';
import { PreviewPlayerContainer, PreviewPlayerVideo } from './style';

const PLAYBACK_UPDATE_PERIOD = 50;

const VIDEO_URL = `${process.env.PUBLIC_URL}/test2.mp4`;

interface StateProps {
    isPlayingPendingChange: boolean | null;
    latestPendingSeek: number | null;
}

interface DispatchProps {
    setIsPlaying: (isPlaying: boolean) => void;
    setPlaybackPlayedSeconds: (playedSeconds: number) => void;
    setPlaybackDuration: (duration: number) => void;
    clearIsPlayingRequest: () => void;
    popPendingSeek: () => void;
}

export type PreviewPlayerProps = StateProps & DispatchProps;

const PreviewPlayer: React.FC<PreviewPlayerProps> = ({
    isPlayingPendingChange,
    latestPendingSeek,
    setPlaybackDuration,
    setPlaybackPlayedSeconds,
    setIsPlaying,
    clearIsPlayingRequest,
    popPendingSeek,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);
    const [isPreviewMaxWidth, setIsPreviewMaxWidth] = useState(false);

    useEffect(() => {
        const { current: video } = videoRef;
        if (!video) {
            return;
        }

        if (isPlayingPendingChange !== null) {
            if (isPlayingPendingChange) {
                video.play();
            } else {
                video.pause();
            }
            clearIsPlayingRequest();
        }

        if (latestPendingSeek !== null) {
            video.currentTime = latestPendingSeek * video.duration;
            popPendingSeek();
        }

        updateProgress();
    }, [isPlayingPendingChange, latestPendingSeek]);

    const updateProgress = useCallback(() => {
        const { current: video } = videoRef;
        if (!video) {
            return;
        }

        const { currentTime: playedSeconds } = video;
        setPlaybackPlayedSeconds(playedSeconds);

        if (video.paused || video.ended) {
            setIsPlaying(false);
            return;
        }

        window.setTimeout(updateProgress, PLAYBACK_UPDATE_PERIOD);
    }, [videoRef]);

    useResizeObserver(() => {
        updateVideoMaxDimension();
    }, containerRef);

    useEffect(() => {
        updateVideoMaxDimension();
    }, [videoAspectRatio]);

    const updateVideoMaxDimension = () => {
        const { current: container } = containerRef;
        if (container && videoAspectRatio) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
            const containerAspecRatio = containerWidth / containerHeight;

            setIsPreviewMaxWidth(videoAspectRatio >= containerAspecRatio);
        }
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
        updateProgress();
    };

    const handleVideoSeeked = () => {
        updateProgress();
    };

    const handleLoadedMetadata = () => {
        const { current: video } = videoRef;
        if (!video) {
            window.requestAnimationFrame(handleLoadedMetadata);
            return;
        }

        const { videoWidth, videoHeight, duration } = video;
        setVideoAspectRatio(videoWidth / videoHeight);
        setPlaybackDuration(duration);

        // TODO: Remove this when volume controls are added
        video.volume = 0.03;
    };

    const videoProps = {
        ref: videoRef,
        controls: true,
        // TODO: Remove this when file uploads are working
        src: VIDEO_URL,
        isMaxWidth: isPreviewMaxWidth,
        onPlay: handleVideoPlay,
        onSeeked: handleVideoSeeked,
        onLoadedMetadata: handleLoadedMetadata,
    };

    return (
        <PreviewPlayerContainer ref={containerRef}>
            <PreviewPlayerVideo {...videoProps} />
        </PreviewPlayerContainer>
    );
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        isPlayingPendingChange: getIsPlayingPendingChange,
        latestPendingSeek: getLatestPendingSeek,
    }),
    {
        setPlaybackPlayedSeconds,
        setPlaybackDuration,
        setIsPlaying,
        clearIsPlayingRequest,
        popPendingSeek,
    }
)(PreviewPlayer);
