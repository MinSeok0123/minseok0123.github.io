import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import copy from 'copy-to-clipboard'
import { toast, ToastContainer, Flip } from 'react-toastify'

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

const ShareWrap = styled.div`
  position: absolute;
  left: calc((100vw - 728px) / 2 - 140px);
  height: 150px;
  width: 64px;
  display: flex;

  @media (max-width: 1200px) {
    display: none;
  }
`

const Share = styled.div`
  width: 4rem;
  background: var(--bg-element2);
  border: 1px solid var(--border4);
  border-radius: 2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
`

const Heart = styled.div`
  height: 3rem;
  width: 3rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: var(--bg-element1);
  border: 1px solid var(--border3);
  border-radius: 1.5rem;
  color: var(--text3);
  cursor: pointer;
  z-index: 5;
  :hover {
    border-color: var(--text1);
    color: var(--text1);
  }
`

const Icon = styled.svg`
  width: 24px;
  height: 24px;
`

const Like = styled.div`
  margin-top: 0.5rem;
  color: var(--text2);
  line-height: 1;
  font-size: 0.75rem;
  margin-bottom: 1rem;
  font-weight: bold;
`

const ShareBtn = styled.div`
  height: 3rem;
  width: 3rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: var(--bg-element1);
  border: 1px solid var(--border3);
  border-radius: 1.5rem;
  color: var(--text3);
  cursor: pointer;
  z-index: 5;
  :hover {
    border-color: var(--text1);
    color: var(--text1);
  }
`

const ShareIcon = styled.svg`
  width: 24px;
  height: 24px;
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

  useEffect(() => {
    const pathname = window.location.pathname
    const decodedValue = decodeURIComponent(pathname.replace(/^\/+|\/+$/g, ''))
    fetch(
      `https://port-0-minlog-be-dihik2mliwbygs1.sel4.cloudtype.app/api/view_count/` +
        encodeURIComponent(decodedValue),
      {
        method: 'POST',
      },
    )
      .then(response => {
        if (response.ok) {
          console.log('조회수 업데이트 성공')
        } else {
          console.log('조회수 업데이트 실패')
        }
      })
      .catch(error => {
        console.log('조회수를 업데이트하는 중에 오류가 발생했습니다.:', error)
      })
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

  const [isLoading, setIsLoading] = useState(true)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeStatus, setLikeStatus] = useState<boolean>()

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const pathname = window.location.pathname
        const decodedValue = decodeURIComponent(
          pathname.replace(/^\/+|\/+$/g, ''),
        )
        const response = await fetch(
          `https://port-0-minlog-be-dihik2mliwbygs1.sel4.cloudtype.app/api/get_count/${encodeURIComponent(
            decodedValue,
          )}`,
          {
            method: 'POST',
          },
        )

        if (response.ok) {
          const data = await response.json()
          setLikeCount(data.like_count)
          setLikeStatus(data.liked)
          setIsLoading(false)
          console.log(data.liked)
        } else {
          throw new Error('네트워크 응답이 좋지 않았습니다.')
        }
      } catch (error) {
        console.log('조회수, 좋아요를 불러오는데 에러 발생:', error)
      }
    }

    fetchLikeCount()
  }, [])

  const copyToClipboard = () => {
    const url = window.location.href
    copy(url)
    toast.success('링크가 복사되었습니다.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Flip,
    })
  }

  const handleClick = async () => {
    try {
      const pathname = window.location.pathname
      const decodedValue = decodeURIComponent(
        pathname.replace(/^\/+|\/+$/g, ''),
      )
      const response = await fetch(
        `https://port-0-minlog-be-dihik2mliwbygs1.sel4.cloudtype.app/api/like/${encodeURIComponent(
          decodedValue,
        )}`,
        {
          method: 'PUT',
        },
      )

      if (response.ok) {
        const data = await response.json()
        setLikeCount(data.like_count)
        setLikeStatus(data.liked)
        console.log(data.liked)
      } else {
        throw new Error('네트워크 응답이 좋지 않았습니다.')
      }
    } catch (error) {
      console.log('좋아요를 업데이트하는 동안 에러 발생:', error)
    }
  }

  return (
    <>
      <ShareWrap
        style={{
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '112px' : '355px',
        }}
      >
        <Share>
          {isLoading ? (
            <Heart />
          ) : (
            <Heart
              onClick={handleClick}
              style={{
                backgroundColor: likeStatus ? 'rgb(56, 217, 169)' : '',
                color: likeStatus ? 'var(--button-text)' : '',
                borderColor: likeStatus ? 'rgb(56, 217, 169)' : '',
              }}
            >
              <Icon>
                <path
                  fill="currentColor"
                  d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
                ></path>
              </Icon>
            </Heart>
          )}
          {isLoading ? <Like>&nbsp;</Like> : <Like>{likeCount}</Like>}
          <ShareBtn onClick={copyToClipboard}>
            <ShareIcon>
              <path
                fill="currentColor"
                d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"
              ></path>
            </ShareIcon>
          </ShareBtn>
          <ToastContainer />
        </Share>
      </ShareWrap>
      <TocWrapper
        style={{
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '112px' : '355px',
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
    </>
  )
}

export default PostContent
