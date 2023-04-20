import React, { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { themeState } from '../../recoil/recoil'
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
`

const CommentWidget = ({ id }: { id: string }) => {
  const element = useRef<HTMLDivElement>(null)
  const theme = useRecoilValue(themeState)

  useEffect(() => {
    if (element.current === null) return

    const utterances: HTMLScriptElement = document.createElement('script')

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme: `github-${theme}`,
      crossorigin: 'anonymous',
      async: 'true',
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    // 이전에 생성된 스크립트 엘리먼트 삭제
    const utterancesWrapper = element.current
    while (utterancesWrapper.firstChild) {
      utterancesWrapper.removeChild(utterancesWrapper.firstChild)
    }

    element.current.appendChild(utterances)
  }, [theme, id])

  return <UtterancesWrapper ref={element} id={id} />
}

export default CommentWidget
