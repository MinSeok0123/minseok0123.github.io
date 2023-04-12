import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @import url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'NanumSquareNeo-Variable', normal;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  body {
    --bg: white;
    --textNormal: #222;
    --textTitle: #222;
    --textLink: blue;
    --hr: hsla(0, 0%, 0%, 0.2);
    --element2: white;
    --darkhover: #dee2e6;

    background-color: var(--bg);
    transition: background-color 0.5s ease;
  }

  body.dark {
    -webkit-font-smoothing: antialiased;

    --bg: #121212;
    --textNormal: white;
    --textTitle: white;
    --textLink: yellow;
    --hr: hsla(0, 0%, 100%, 0.2);
    --element: #1e1e1e;
    --darkhover: #4D4D4D;

    transition: background-color 0.5s ease;

    color: var(--textNormal);
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
