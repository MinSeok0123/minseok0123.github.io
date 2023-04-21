import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type PostContentProps = {
  html: string
}

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 10px 0;
  word-break: break-all;

  // Markdown Style
  line-height: 1.8;
  font-size: 16px;
  font-weight: 400;

  // Apply Padding Attribute to All Elements
  p {
    padding: 3px 0;
  }

  img {
    display: block;
    margin: 3rem auto;
    max-width: 100%;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      margin-bottom: 10px;
    }
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 80px;

    @media (max-width: 768px) {
      margin-top: 30px;
    }
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 20px;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 2rem 0px;
    border-left: 4px solid var(--velog);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: var(--bg-element2);
    padding: 1rem 1rem 1rem 2rem;
    color: var(--text1);
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 30px 0;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid var(--hr);
    margin: 100px 0;
  }

  // Adjust Link Element Style
  a {
    color: #4263eb;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    margin: 30px 0;
    padding: 15px;
    font-size: 15px;

    @media (max-width: 768px) {
      font-size: 0.75rem;
      margin: 20px 0;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
    background: var(--prism-bg);
    color: var(--prism-default-text);
  }

  // Markdown Responsive Design
  @media (max-width: 768px) {
    width: 100%;
    padding: 80px 20px;
    line-height: 1.6;
    font-size: 14px;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }
`

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent
