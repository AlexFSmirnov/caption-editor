import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
    }
    html {
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    body {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    }
    #root {
        width: 100%;
        height: 100%;
    }

    /* TODO: Make styles better */
    .Resizer {
        background: #000;
        opacity: 0.2;
        z-index: 1;
        box-sizing: border-box;
        background-clip: padding-box;
    }

    .Resizer:hover {
        transition: all 300ms ease;
    }

    .Resizer.horizontal {
        height: 11px;
        margin: -5px 0;
        border-top: 5px solid rgba(255, 255, 255, 0);
        border-bottom: 5px solid rgba(255, 255, 255, 0);
        cursor: row-resize;
        width: 100%;
    }

    .Resizer.horizontal:hover {
        border-top: 5px solid rgba(0, 0, 0, 0.5);
        border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.vertical {
        width: 11px;
        margin: 0 -5px;
        border-left: 5px solid rgba(255, 255, 255, 0);
        border-right: 5px solid rgba(255, 255, 255, 0);
        cursor: col-resize;
    }

    .Resizer.vertical:hover {
        border-left: 5px solid rgba(0, 0, 0, 0.5);
        border-right: 5px solid rgba(0, 0, 0, 0.5);
    }
    .Resizer.disabled {
        cursor: not-allowed;
    }
    .Resizer.disabled:hover {
        border-color: transparent;
    }
`;

export const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;
