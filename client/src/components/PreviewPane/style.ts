import styled from 'styled-components';

export const PreviewPaneContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PreviewPanePlayerContainer = styled.div`
    max-height: calc(100% - 48px);
`;

export const PreviewPaneControlsContainer = styled.div`
    display: flex;
`;
