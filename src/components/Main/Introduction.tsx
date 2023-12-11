import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
// import { IGatsbyImageData } from 'gatsby-plugin-image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { useRecoilState } from 'recoil'
import { themeState } from '../../recoil/recoil'

// type IntroductionProps = {
//   profileImage: IGatsbyImageData
// }

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

const Logo = styled.a`
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
    gap: 2px;
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
    background-color: var(--darkhover);
    transition: all 0.125s ease-in 0s;
  }

  @media (max-width: 1056px) {
    width: 2.8rem;
    height: 2rem;
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
    background-color: var(--darkhover);
    transition: all 0.125s ease-in 0s;
  }
  @media (max-width: 1056px) {
    width: 2rem;
    height: 2rem;
  }
`

const About = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  font-size: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--bg-element5);
  color: var(--bg-element5);
  font-weight: 600;
  outline: none;
  background-color: var(--bg-element2);
  cursor: pointer;
  :hover {
    background-color: black;
    transition: all 0.125s ease-in 0s;
    color: white;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({}) {
  const notify = () => toast('준비중입니다.')
  const [theme, toggleTheme] = useTheme()

  const [isDarkMode, setDarkMode] = React.useState(theme === 'dark')

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked)
  }

  const [globalTheme, setGlobalTheme] = useRecoilState(themeState)
  React.useEffect(() => {
    setGlobalTheme(theme === 'light' ? 'light' : 'dark')
  }, [theme, setGlobalTheme])

  return (
    <HeaderCon>
      <Header>
        <Logo href="/">minlog</Logo>
        <Nav>
          <Dark
            onClick={() => {
              toggleTheme(theme === 'light' ? 'dark' : 'light')
              toggleDarkMode(!isDarkMode)
            }}
            role="checkbox"
            aria-checked={theme === 'dark'}
            tabIndex={0}
          >
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={25}
            />
          </Dark>
          <a href="/search">
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
          </a>
          <a href="https://successful-star-405.notion.site/Lee-MinSeok-1812001504044d3f9b8a31b731823db5">
            <About>ABOUT</About>
          </a>
        </Nav>
      </Header>
    </HeaderCon>
  )
}

export default Introduction
