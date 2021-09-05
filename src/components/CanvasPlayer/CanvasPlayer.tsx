import { useRef, useState, useEffect, useCallback } from 'react';
import { CanvasPlayerCanvas, CanvasPlayerContainer, CanvasPlayerVideo } from './style';

const CanvasPlayer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [containerSize, setContainerSize] = useState([0, 0]);
    const [videoSize, setVideoSize] = useState<[number, number] | null>(null);
    const [canvasSize, setCanvasSize] = useState([0, 0]);

    const handleNewFrame = useCallback(() => {
        const { current: canvas } = canvasRef;
        const { current: video } = videoRef;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !video || !ctx) {
            return;
        }

        console.log('timer on');

        ctx.drawImage(video, 0, 0, canvasSize[0], canvasSize[1]);
    }, [canvasRef, videoRef, canvasSize]);

    const frameTimer = useCallback(() => {
        const { current: canvas } = canvasRef;
        const { current: video } = videoRef;

        if (!canvas || !video || video.paused || video.ended) {
            return;
        }

        handleNewFrame();

        window.requestAnimationFrame(frameTimer);
    }, [canvasRef, videoRef, handleNewFrame]);

    useEffect(() => {
        const { current: container } = containerRef;
        if (container && videoSize) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
            const [videoWidth, videoHeight] = videoSize;
            // TODO: Make video stretch to fill while preserving aspect ratio
        }
    }, [containerRef, videoSize]);

    const handleVideoPlay = () => {
        frameTimer();
    };

    const handleLoadedMetadata = () => {
        const { current: video } = videoRef;
        if (!video) {
            window.requestAnimationFrame(handleLoadedMetadata);
            return;
        }

        const { videoWidth, videoHeight } = video;
        setVideoSize([videoWidth, videoHeight]);
        setCanvasSize([videoWidth / 5, videoHeight / 5]);
        video.play();
    };

    const videoUrl = `${process.env.PUBLIC_URL}/test2.mp4`;

    const playerProps = {
        url: videoUrl,
        controls: true,
    };

    const videoProps = {
        ref: videoRef,
        src: videoUrl,
        controls: true,
        width: 300,
        height: 200,
        onPlay: handleVideoPlay,
        onLoadedMetadata: handleLoadedMetadata,
    };

    const [canvasWidth, canvasHeight] = canvasSize;
    const canvasProps = {
        ref: canvasRef,
        width: canvasWidth,
        height: canvasHeight,
    };

    return (
        <CanvasPlayerContainer ref={containerRef}>
            <CanvasPlayerVideo {...videoProps} />
            <CanvasPlayerCanvas {...canvasProps} />
        </CanvasPlayerContainer>
    );
};

export default CanvasPlayer;
