import SplitPane from 'react-split-pane';
import { useRef, useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Preview, Timeline } from './components';
import { AppContainer, GlobalStyle } from './style';

const App: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const { current: container } = containerRef;
        if (container) {
            const { width, height } = container.getBoundingClientRect();

            setDefaultTimelineHeight(Math.round(height * 0.4));
            setDefaultPreviewWidth(Math.round(width * 0.6));
        }
    }, [containerRef]);

    const [defaultTimelineHeight, setDefaultTimelineHeight] = useState(200);
    const [defaultPreviewWidth, setDefaultPreviewWidth] = useState(200);

    return (
        <AppContainer ref={containerRef}>
            <GlobalStyle />
            <CssBaseline />

            <SplitPane split="horizontal" primary="second" defaultSize={defaultTimelineHeight}>
                <SplitPane split="vertical" primary="second" defaultSize={defaultPreviewWidth}>
                    <div>Whatever ends up here</div>
                    <Preview />
                </SplitPane>

                <Timeline />
            </SplitPane>
        </AppContainer>
    );
};

export default App;
