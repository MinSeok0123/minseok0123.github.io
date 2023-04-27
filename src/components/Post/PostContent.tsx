import React, { FunctionComponent, useEffect, useState } from 'react'
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

const TocWrapper = styled.div`
  position: absolute;
  right: calc((100vw - 728px) / 2 - 340px);
  width: 240px;
  overflow: hidden auto;
  padding: 0.25rem 0.75rem;
  line-height: 1.5;
  border-left: 2px solid var(--border4);
  color: var(--text3);
  max-height: calc(100vh - 128px);
  font-size: 0.875rem;

  @media (max-width: 1500px) {
    right: calc((100vw - 728px) / 2 - 280px);
  }

  @media (max-width: 1200px) {
    display: none;
  }

  a:hover {
    color: var(--text1);
  }

  div {
    display: block;
    transition: all 0.125s ease-in 0s;
  }

  .toc-level-1 {
    margin-left: 0;
  }
  .toc-level-2 {
    margin-top: 4px;
    margin-left: 12px;
  }
  .toc-level-3 {
    margin-top: 4px;
    margin-left: 24px;
  }
`

type TocProps = {
  headings: Array<{ id: string; text: string; level: number }>
}

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  const [headings, setHeadings] = React.useState<
    Array<{ id: string; text: string; level: number }>
  >([])

  useEffect(() => {
    const headingElements = document.querySelectorAll(
      '.markdown-body h1, .markdown-body h2, .markdown-body h3',
    )
    const headings = Array.from(headingElements).map(headingElement => ({
      id: headingElement.getAttribute('id') || '',
      text: headingElement.textContent || '',
      level: Number(headingElement.tagName.charAt(1)),
    }))
    setHeadings(headings)
  }, [])

  return (
    <>
      <Toc headings={headings} />
      <MarkdownRenderer
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}

const Toc: FunctionComponent<TocProps> = ({ headings }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop

      const headingElements = document.querySelectorAll(
        '.markdown-body h1, .markdown-body h2, .markdown-body h3',
      )
      const headingOffsets = Array.from(headingElements).map(headingElement => {
        const elementTop =
          headingElement.getBoundingClientRect().top + scrollTop
        const headingId = headingElement.getAttribute('id') || ''
        return { top: elementTop, id: headingId }
      })

      const index = headingOffsets.findIndex(({ top }) => top > scrollTop + 80)
      if (index === -1) {
        setActiveIndex(headingOffsets.length - 1)
      } else if (index > 0) {
        setActiveIndex(index - 1)
      } else {
        setActiveIndex(null)
      }

      if (scrollTop > 240) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <TocWrapper
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: isFixed ? '112px' : 'calc(35% + 20px)',
      }}
    >
      {headings.map((heading, index) => (
        <div
          key={heading.id}
          className={`toc-level-${heading.level}`}
          style={{
            ...(index === activeIndex && {
              transform: 'scale(1.05)',
              display: 'block',
              transition: 'all 0.125s ease-in 0s',
              color: 'var(--text1)',
            }),
          }} // 클래스 이름에 레벨 정보를 추가
        >
          <a href={`#${heading.id}`}>{heading.text}</a>
        </div>
      ))}
    </TocWrapper>
  )
}

export default PostContent
