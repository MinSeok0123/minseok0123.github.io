import styled from '@emotion/styled'
import { useEffect } from 'react'
import CategoryList from './CategoryList'
import {
  selectedCategoryState,
  categoryListState,
  categoryState,
  activeTabState,
} from '../../recoil/recoil'
import { useRecoilState, useRecoilValue } from 'recoil'

const ToNav = styled.div`
  position: relative;
  margin-top: 1.5rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1728px;
  height: 48px;
  margin: 0 auto;

  @media (max-width: 1919px) {
    width: 1376px;
  }

  @media (max-width: 1440px) {
    width: 1024px;
  }

  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }

  @media (max-width: 768px) {
    width: calc(100% - 2rem);
  }
`

const TogNav = styled.div`
  width: 320px;
  height: 48px;
  display: flex;
  align-items: center;
`

const NavItem = styled.div`
  width: 7rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-size: 1.125rem;
  text-decoration: none;
  height: 3rem;
  cursor: pointer;
`

const Icon = styled.div`
  margin-top: 0.4rem;
  margin-right: 0.5rem;
  font-size: 1.5rem;
`

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`

const Category = styled.div`
  background-color: var(--element);
  color: var(--category);
  height: 2rem;
  width: 6rem;
  border-radius: 4px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: -5px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 4px;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 5.25rem;
    font-size: 1.5rem;
  }
`

const Catename = styled.span`
  font-size: 0.875rem;
  @media (max-width: 1024px) {
    font-size: 0.75rem;
  }
`

const CategoryCon = styled.div`
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 230px;
`

export default function ToggleNav() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState)

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tense', tabName === '트렌딩' ? '트렌딩' : '최신')
    }
  }

  useEffect(() => {
    const savedTab = sessionStorage.getItem('tense')
    if (savedTab === '트렌딩' || savedTab === '최신') {
      setActiveTab(savedTab)
    }
    if (sessionStorage.getItem('category')) {
      sessionStorage.setItem('category', 'close')
    }
  }, [])

  const selectedCategory = useRecoilValue(selectedCategoryState)
  const categoryList = useRecoilValue(categoryListState)

  console.log(categoryList)
  console.log(selectedCategory)

  const [category, setCategory] = useRecoilState(categoryState)

  const handleClick = () => {
    setCategory(category === 'open' ? 'close' : 'open')
  }

  return (
    <ToNav>
      <TogNav>
        <a href="/">
          <NavItem
            className={activeTab === '트렌딩' ? 'active' : ''}
            onClick={() => handleTabClick('트렌딩')}
            style={{
              color:
                activeTab === '트렌딩' ? 'var( --tenseactiv)' : 'var( --tense)',
            }}
          >
            <Icon>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
              </svg>
            </Icon>
            <span>트렌딩</span>
          </NavItem>
        </a>
        <a href="/recent">
          <NavItem
            className={activeTab === '최신' ? 'active' : ''}
            onClick={() => handleTabClick('최신')}
            style={{
              color:
                activeTab === '최신' ? 'var( --tenseactiv)' : 'var( --tense)',
            }}
          >
            <Icon>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
              </svg>
            </Icon>
            <span>최신</span>
          </NavItem>
        </a>
        <CategoryCon onClick={handleClick}>
          <Category>
            <Catename>{String(selectedCategory)}</Catename>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </Category>
          {category === 'open' && (
            <CategoryList
              categoryList={categoryList}
              selectedCategory={selectedCategory}
            />
          )}
        </CategoryCon>
      </TogNav>
      <Menu>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1.5em"
          width="1.5em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
        </svg>
      </Menu>
    </ToNav>
  )
}
