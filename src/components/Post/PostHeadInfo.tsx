import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

// const PostHeadInfoWrapper = styled.div`
//   margin-top: 5.5rem;
//   width: 768px;
//   margin-left: auto;
//   margin-right: auto;

//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 40px 20px;
//   }
// `

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
  justify-content: space-between;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`

const Information = styled.div``

const Like = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    background: var(--bg-element1);
    border: 1px solid var(--border2);
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 1.5rem;
    border-radius: 0.75rem;
    outline: none;
  }
`

const Heartsvg = styled.svg`
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.75rem;
`

const LikeCount = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
`

const Date = styled.span`
  color: var(--text2);
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const Separator = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const View = styled.span`
  font-size: 1rem;
  color: var(--text2);
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const CateWrap = styled.div`
  margin-top: 0.875rem;
  margin-bottom: -0.875rem;
  min-height: 0.875rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    margin-bottom: -0.5rem;
    min-height: 0.5rem;
  }
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

  @media (max-width: 768px) {
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
}) {
  // const goBackPage = () => window.history.back()

  const [isLoading, setIsLoading] = useState(true)
  const [viewCount, setViewCount] = useState(0)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeStatus, setLikeStatus] = useState<boolean>()

  useEffect(() => {
    const fetchViewCount = async () => {
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
          setViewCount(data.view_count)
          setLikeCount(data.like_count)
          setLikeStatus(data.liked)
          setIsLoading(false)
        } else {
          throw new Error('네트워크 응답이 좋지 않았습니다.')
        }
      } catch (error) {
        console.log('조회수, 좋아요를 불러오는데 에러 발생:', error)
      }
    }

    fetchViewCount()
  }, [])

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
      {/* <PostHeadInfoWrapper> */}
      {/* <PrevPageIcon onClick={goBackPage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PrevPageIcon> */}
      <HeadWrap>
        <Title>{title}</Title>
        <DateWrap>
          <Information>
            <Date>{date}</Date>
            <Separator>·</Separator>
            {isLoading ? (
              <View>조회수: </View>
            ) : (
              <View>조회수: {viewCount}</View>
            )}
          </Information>
          <Like
            onClick={handleClick}
            style={{
              backgroundColor: likeStatus ? 'rgb(56, 217, 169)' : '',
              color: likeStatus ? 'var(--button-text)' : 'var(--text3)',
              borderColor: likeStatus ? 'rgb(56, 217, 169)' : '',
            }}
          >
            <Heartsvg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
              ></path>
            </Heartsvg>
            <LikeCount>{likeCount}</LikeCount>
          </Like>
        </DateWrap>
        <CateWrap>
          {Array.isArray(categories) &&
            categories.map((category, index) => (
              <Link to={`/?category=${category}`}>
                <Cate key={index}>
                  {index > 0}
                  {category}
                </Cate>
              </Link>
            ))}
        </CateWrap>
      </HeadWrap>
      {/* </PostHeadInfoWrapper> */}
    </>
  )
}

export default PostHeadInfo
