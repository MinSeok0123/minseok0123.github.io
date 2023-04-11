import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

const HeaderCon = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  width: 100%;
  max-width: 1728px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;

  @media (max-width: 1919px) {
    max-width: 1376px;
  }

  @media (max-width: 1440px) {
    max-width: 1024px;
  }

  @media (max-width: 1056px) {
    max-width: calc(100% - 2rem);
  }
`

const Logo = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap');
  font-family: 'Fira Mono', monospace;
  font-weight: 450;
  font-size: 1.5rem;
`

const Nav = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 15px;
  @media (max-width: 1056px) {
    max-width: 153px;
  }
`
const Dark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    background-color: #dee2e6;
    transition: all 0.125s ease-in 0s;
  }
`

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    background-color: #dee2e6;
    transition: all 0.125s ease-in 0s;
  }
`

const About = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  font-size: 1rem;
  border-radius: 1rem;
  border: 1px solid black;
  font-weight: 600;
  outline: none;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: black;
    transition: all 0.125s ease-in 0s;
    color: white;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({}) {
  return (
    <HeaderCon>
      <Header>
        <Logo>minlog</Logo>
        <Nav>
          <Dark>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"></path>
            </svg>
          </Dark>
          <Search>
            <svg width="17" height="17" viewBox="0 0 17 17">
              <path
                fill-rule="evenodd"
                d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                clip-rule="evenodd"
                fill="currentColor"
              ></path>
            </svg>
          </Search>
          <About>ABOUT</About>
        </Nav>
      </Header>
    </HeaderCon>
  )
}

export default Introduction
