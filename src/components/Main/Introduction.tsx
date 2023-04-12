import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'

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

  if (theme === null) {
    return null
  }
  return (
    <HeaderCon>
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
      <Header>
        <Logo href="/">minlog</Logo>
        <Nav>
          <Dark
            onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
            role="checkbox"
            aria-checked={theme === 'dark'}
            tabIndex={0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.6144 14.6145C19.787 14.8653 18.9093 15.0001 18 15.0001C13.0294 15.0001 9 10.9707 9 6.00013C9 5.09088 9.13484 4.21311 9.3856 3.38574C5.69007 4.50583 3 7.93883 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.0613 21.0001 19.4943 18.3101 20.6144 14.6145Z"
                fill="currentColor"
              ></path>
            </svg>
          </Dark>
          <Search onClick={notify}>
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
