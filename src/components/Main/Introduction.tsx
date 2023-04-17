import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

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

const Logo = styled.a`
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
    width: 2.8rem;
    height: 2rem;
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
  const notify = () => toast('준비중입니다.')
  const [theme, toggleTheme] = useTheme()

  const [isDarkMode, setDarkMode] = React.useState(true)

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked)
  }

  if (theme === null) {
    return null
  }

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
              checked={theme === 'dark'}
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
          <About onClick={notify}>ABOUT</About>
          <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={2000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            pauseOnHover // 마우스를 올리면 알람 정지
            theme="light"
            // limit={1} // 알람 개수 제한
          />
        </Nav>
      </Header>
    </HeaderCon>
  )
}

export default Introduction
