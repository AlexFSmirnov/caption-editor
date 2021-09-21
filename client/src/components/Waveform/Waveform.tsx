import WaveSurfer from 'wavesurfer.js';
import { useRef, useEffect } from 'react';
import { useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPlayedFraction } from '../../redux/selectors';
import { WaveformContainer } from './style';
import { State } from '../../redux/types';

// TODO: Remove this once video upload is working.
const VIDEO_URL = `${process.env.PUBLIC_URL}/test2.mp4`;
const WAVEFORM_CONTAINER_ID = 'waveform';

interface StateProps {
    playedFraction: number;
}

export type WaveformProps = StateProps;

const Waveform: React.FC<WaveformProps> = ({ playedFraction }) => {
    const theme = useTheme();
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const zoomLevel = useRef(200);

    useEffect(() => {
        if (wavesurferRef.current) {
            return;
        }

        wavesurferRef.current = WaveSurfer.create({
            container: `#${WAVEFORM_CONTAINER_ID}`,
            height: 64,
            backgroundColor: 'rgba(0,0,0,0)',
            waveColor: theme.palette.text.secondary,
            // minPxPerSec: 200,
            hideScrollbar: true,
            scrollParent: true,
            // fillParent: false,
        });
    }, []);

    useEffect(() => {
        const { current: wavesurfer } = wavesurferRef;
        if (wavesurfer) {
            wavesurfer.load(VIDEO_URL);
        }
    }, []);

    useEffect(() => {
        const { current: wavesurfer } = wavesurferRef;
        if (wavesurfer) {
            wavesurfer.seekTo(playedFraction);
        }
    }, [playedFraction]);

    const zoom = (to: number) => () => {
        const { current: wavesurfer } = wavesurferRef;
        if (!wavesurfer) {
            return;
        }
        zoomLevel.current += to;
        wavesurfer.zoom(zoomLevel.current);
    };

    return (
        <div>
            <WaveformContainer id={WAVEFORM_CONTAINER_ID} />
            <button onClick={zoom(50)}>+50</button>
            <button onClick={zoom(-50)}>-50</button>
        </div>
    );
};

export default connect<StateProps, {}, {}, State>(
    createStructuredSelector({
        playedFraction: getPlayedFraction,
    })
)(Waveform);
