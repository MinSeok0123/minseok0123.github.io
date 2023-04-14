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
    --darkhover: #dee2e6;
    --category: #495057;
    --tenseactiv: #212529;
    --tense: #868e96;
    --velog: #12b886;
    --catebg: #e9ecef;

    background-color: var(--bg);
  }

  body.dark {
    -webkit-font-smoothing: antialiased;

    --bg: #121212;
    --textNormal: white;
    --textTitle: white;
    --textLink: yellow;
    --hr: hsla(0, 0%, 100%, 0.2);
    --element: #1e1e1e;
    --darkhover: #4d4d4d;
    --postback: #121212;
    --category: #d9d9d9;
    --tenseactiv: #ececec;
    --tense: #acacac;
    --catebg: #121212;

    color: var(--textNormal);
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
