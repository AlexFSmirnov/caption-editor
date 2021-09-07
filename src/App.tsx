import SplitPane from 'react-split-pane';
import { useRef, useEffect, useState } from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { PreviewPane, TimelinePane } from './components';
import { AppContainer, GlobalStyle } from './style';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const App: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const { current: container } = containerRef;
        if (container) {
            const { width, height } = container.getBoundingClientRect();

            setDefaultTimelinePaneHeight(Math.round(height * 0.4));
            setDefaultPreviewPaneWidth(Math.round(width * 0.6));
        }
    }, [containerRef]);

    const [defaultTimelinePaneHeight, setDefaultTimelinePaneHeight] = useState(200);
    const [defaultPreviewPaneWidth, setDefaultPreviewPaneWidth] = useState(200);

    return (
        <ThemeProvider theme={theme}>
            <AppContainer ref={containerRef}>
                <GlobalStyle />
                <CssBaseline />

                <SplitPane split="horizontal" primary="second" defaultSize={defaultTimelinePaneHeight}>
                    <SplitPane split="vertical" primary="second" defaultSize={defaultPreviewPaneWidth} minSize={250}>
                        <div>Whatever ends up here</div>
                        <PreviewPane />
                    </SplitPane>

                    <TimelinePane />
                </SplitPane>
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;
