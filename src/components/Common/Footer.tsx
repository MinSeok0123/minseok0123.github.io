import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const Acolor = styled.a`
  color: #3a95ff;
`

const Footer: FunctionComponent = function () {
  const currentYear = new Date().getFullYear()

  return (
    <FooterWrapper>
      <span>
        © {currentYear}&nbsp;
        <Acolor href="https://github.com/MinSeok0123">Minseok</Acolor>
        &nbsp;powered by&nbsp;
        <Acolor href="https://github.com/MinSeok0123/minseok0123.github.io">
          minlog
        </Acolor>
      </span>
    </FooterWrapper>
  )
}

export default Footer
