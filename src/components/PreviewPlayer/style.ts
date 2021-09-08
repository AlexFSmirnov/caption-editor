import styled from 'styled-components';

export const PreviewPlayerContainer = styled.div`
    width: 100%;
    height: 100%;
`;

interface PreviewPlayerVideoProps {
    isMaxWidth?: boolean;
}

export const PreviewPlayerVideo = styled.video<PreviewPlayerVideoProps>`
    max-width: 100%;
    max-height: 100%;

    ${props => (props.isMaxWidth ? 'width' : 'height')}: 100%;
`;
