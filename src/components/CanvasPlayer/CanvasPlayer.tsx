import { useRef, useState, useEffect, useCallback } from 'react';
import { useResizeObserver } from '../../common';
import { CanvasPlayerCanvas, CanvasPlayerContainer, CanvasPlayerVideo } from './style';

const VIDEO_URL = `${process.env.PUBLIC_URL}/test2.mp4`;

const CanvasPlayer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [canvasSize, setCanvasSize] = useState([1, 1]);
    const [isCanvasMaxWidth, setIsCanvasMaxWidth] = useState(false);

    const handleNewFrame = useCallback(() => {
        const { current: canvas } = canvasRef;
        const { current: video } = videoRef;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !video || !ctx) {
            return;
        }

        console.log('new frame');

        ctx.drawImage(video, 0, 0, canvasSize[0], canvasSize[1]);
    }, [canvasRef, videoRef, canvasSize]);

    const tick = useCallback(() => {
        const { current: canvas } = canvasRef;
        const { current: video } = videoRef;

        if (!canvas || !video || video.paused || video.ended) {
            return;
        }

        handleNewFrame();

        window.requestAnimationFrame(tick);
    }, [canvasRef, videoRef, handleNewFrame]);

    useResizeObserver(() => {
        console.log('observe!');
        updateCanvasMaxDimension();
    }, containerRef);

    useEffect(() => {
        updateCanvasMaxDimension();
    }, [canvasSize]);

    const updateCanvasMaxDimension = () => {
        const { current: container } = containerRef;
        if (container && canvasSize) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
            const [canvasWidth, canvasHeight] = canvasSize;

            const containerAspecRatio = containerWidth / containerHeight;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            setIsCanvasMaxWidth(canvasAspectRatio >= containerAspecRatio);
        }
    };

    const handleVideoPlay = () => {
        tick();
    };

    const handleLoadedMetadata = () => {
        const { current: video } = videoRef;
        if (!video) {
            window.requestAnimationFrame(handleLoadedMetadata);
            return;
        }

        const { videoWidth, videoHeight } = video;
        setCanvasSize([videoWidth, videoHeight]);

        // TODO: Remove this when controls are added
        video.play();
        video.volume = 0;
    };

    const videoProps = {
        ref: videoRef,
        // TODO: Remove this when file uploads are working
        src: VIDEO_URL,
        onPlay: handleVideoPlay,
        onLoadedMetadata: handleLoadedMetadata,
    };

    const [canvasWidth, canvasHeight] = canvasSize;
    const canvasProps = {
        ref: canvasRef,
        width: canvasWidth,
        height: canvasHeight,
        isMaxWidth: isCanvasMaxWidth,
    };

    return (
        <CanvasPlayerContainer ref={containerRef}>
            <CanvasPlayerVideo {...videoProps} />
            <CanvasPlayerCanvas {...canvasProps} />
        </CanvasPlayerContainer>
    );
};

export default CanvasPlayer;
