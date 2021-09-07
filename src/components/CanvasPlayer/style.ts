import styled from 'styled-components';

export const CanvasPlayerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: inline-block;
`;

export const CanvasPlayerVideo = styled.video`
    width: 0;
    height: 0;
    display: none;
`;

interface CanvasPlayerCanvasProps {
    isMaxWidth?: boolean;
}

export const CanvasPlayerCanvas = styled.canvas<CanvasPlayerCanvasProps>`
    max-width: 100%;
    max-height: 100%;

    ${props => (props.isMaxWidth ? 'width' : 'height')}: 100%;
`;
