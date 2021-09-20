import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IconButton } from '@material-ui/core';
import { PlayArrow, Pause, SkipPrevious, SkipNext, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { requestIsPlaying, pushPendingSeek } from '../../redux/actions';
import { getIsPlaying } from '../../redux/selectors';
import { State } from '../../redux/types';
import { PreviewPlayer } from '../PreviewPlayer';
import { PreviewPaneContainer, PreviewPaneControlsContainer, PreviewPanePlayerContainer } from './style';

interface StateProps {
    isPlaying: boolean;
}

interface DispatchProps {
    requestIsPlaying: (isPlaying: boolean) => void;
    // TODO: Add actual functions for frame/start-end seeking
    pushPendingSeek: (seekToFraction: number) => void;
}

export type PreviewPaneProps = StateProps & DispatchProps;

const PreviewPane: React.FC<PreviewPaneProps> = ({ isPlaying, requestIsPlaying, pushPendingSeek }) => {
    const handlePlayPauseClick = () => {
        requestIsPlaying(!isPlaying);
    };

    const handleSeekToStartClick = () => {
        pushPendingSeek(0.3);
    };

    const handleSeekToEndClick = () => {
        pushPendingSeek(0.7);
    };

    return (
        <PreviewPaneContainer>
            <PreviewPanePlayerContainer>
                <PreviewPlayer />
            </PreviewPanePlayerContainer>
            <PreviewPaneControlsContainer>
                <IconButton onClick={handleSeekToStartClick}>
                    <ChevronLeft />
                </IconButton>
                <IconButton>
                    <SkipPrevious />
                </IconButton>
                <IconButton onClick={handlePlayPauseClick}>{isPlaying ? <Pause /> : <PlayArrow />}</IconButton>
                <IconButton>
                    <SkipNext />
                </IconButton>
                <IconButton onClick={handleSeekToEndClick}>
                    <ChevronRight />
                </IconButton>
            </PreviewPaneControlsContainer>
        </PreviewPaneContainer>
    );
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        isPlaying: getIsPlaying,
    }),
    {
        requestIsPlaying,
        pushPendingSeek,
    }
)(PreviewPane);
