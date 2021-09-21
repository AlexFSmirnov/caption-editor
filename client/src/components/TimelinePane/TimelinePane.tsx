import { Waveform } from '../Waveform';
import { TimelinePaneContainer } from './style';

const TimelinePane: React.FC = () => {
    return (
        <TimelinePaneContainer>
            <Waveform />
        </TimelinePaneContainer>
    );
};

export default TimelinePane;
