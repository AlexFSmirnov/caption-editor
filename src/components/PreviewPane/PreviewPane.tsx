import { IconButton } from '@material-ui/core';
import { PlayArrow, Pause, SkipPrevious, SkipNext, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { CanvasPlayer } from '../CanvasPlayer';
import { PreviewPaneContainer, PreviewPaneControlsContainer, PreviewPanePlayerContainer } from './style';

const PreviewPane: React.FC = () => {
    return (
        <PreviewPaneContainer>
            <PreviewPanePlayerContainer>
                <CanvasPlayer />
            </PreviewPanePlayerContainer>
            <PreviewPaneControlsContainer>
                <IconButton>
                    <ChevronLeft />
                </IconButton>
                <IconButton>
                    <SkipPrevious />
                </IconButton>
                <IconButton>
                    <PlayArrow />
                </IconButton>
                <IconButton>
                    <SkipNext />
                </IconButton>
                <IconButton>
                    <ChevronRight />
                </IconButton>
            </PreviewPaneControlsContainer>
        </PreviewPaneContainer>
    );
};

export default PreviewPane;
