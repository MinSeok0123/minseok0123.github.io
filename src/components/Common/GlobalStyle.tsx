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
    --bg-element2: #f8f9fa;
    --bg-element5: #212529;
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
    --border1: #343a62;
    --border2: #adb5bd;
    --text1: #212529;
    --text2: #495057;
    --text3: #868e96;
    --bg-tag: #f8f9fa;
    --border4: #f1f3f5;

    --prism-bg: #fbfcfd;
    --prism-default-text: #24292e;
    background-color: var(--bg);
  }

  body.dark {
    -webkit-font-smoothing: antialiased;

    --bg: #121212;
    --bg-element2: #1e1e1e;
    --bg-element5: #f1f3f5;
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
    --border1: #e0e0e0;
    --border2: #a0a0a0;
    --text1: #ececec;
    --text2: #d9d9d9;
    --text3: #acacac;
    --bg-tag: #252525;
    --border4: #2a2a2a;

    --prism-bg: #1e1e1e;
    --prism-default-text: #e0e6f1;
    color: var(--textNormal);
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
