import React, { createRef, FunctionComponent, useEffect } from 'react'
import styled from '@emotion/styled'

const src = 'https://utteranc.es/client.js'
const repo = 'minseok0123/minseok0123.github.io' // 자신 계정의 레포지토리로 설정

type UtterancesAttributesType = {
  src: string
  repo: string
  'issue-term': string
  label: string
  theme: string
  crossorigin: string
  async: string
}

const UtterancesWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }

  ${({ theme }) =>
    theme === 'dark' &&
    `
  `}
`

const CommentWidget: FunctionComponent<{ id: string }> = function ({ id }) {
  const element = createRef<HTMLDivElement>()

  useEffect(() => {
    if (element.current === null) return

    const utterances: HTMLScriptElement = document.createElement('script')

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme: `github-${
        (typeof window !== 'undefined' && localStorage.getItem('theme')) ||
        'light'
      }`,
      crossorigin: 'anonymous',
      async: 'true',
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    element.current.appendChild(utterances)
  }, [])

  return (
    <UtterancesWrapper
      ref={element}
      id={id}
      theme={
        (typeof window !== 'undefined' && localStorage.getItem('theme')) ||
        'light'
      }
    />
  )
}

export default CommentWidget
