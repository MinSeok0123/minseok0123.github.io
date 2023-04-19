import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

const PostHeadInfoWrapper = styled.div`
  margin-top: 5.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`

// const PrevPageIcon = styled.div`
//   display: grid;
//   place-items: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: #ffffff;
//   color: #000000;
//   font-size: 22px;
//   cursor: pointer;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

//   @media (max-width: 768px) {
//     width: 30px;
//     height: 30px;
//     font-size: 18px;
//   }
// `

const HeadWrap = styled.div`
  @media (max-width: 1024px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  margin-top: 0px;
  font-weight: 800;
  color: var(--text1);
  margin-bottom: 2rem;
  word-break: keep-all;
  transition: color 0.125s ease-in 0s;

  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }
`

const DateWrap = styled.div`
  -webkit-box-align: center;
  align-items: center;
  font-size: 1rem;
  color: var(--text2);
  display: flex;
  -webkit-box-pack: justify;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`

const Date = styled.span`
  color: var(--text1);
  font-weight: bold;
`

const CateWrap = styled.div`
  margin-top: 0.875rem;
  margin-bottom: -0.875rem;
  min-height: 0.875rem;
`

const Cate = styled.div`
  margin-bottom: 0.875rem;
  background: var(--bg-tag);
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.875rem;
  color: var(--velog);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
}) {
  // const goBackPage = () => window.history.back()

  return (
    <>
      {/* <PostHeadInfoWrapper> */}
      {/* <PrevPageIcon onClick={goBackPage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PrevPageIcon> */}
      <HeadWrap>
        <Title>{title}</Title>
        <DateWrap>
          <Date>{date}</Date>
        </DateWrap>
        <CateWrap>
          {Array.isArray(categories) &&
            categories.map((category, index) => (
              <Cate key={index}>
                {index > 0}
                {category}
              </Cate>
            ))}
        </CateWrap>
      </HeadWrap>
      {/* </PostHeadInfoWrapper> */}
    </>
  )
}

export default PostHeadInfo
