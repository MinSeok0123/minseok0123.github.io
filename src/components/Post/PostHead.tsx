import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Introduction from 'components/Main/Introduction'

type GatsbyImgProps = {
  image: IGatsbyImageData
  alt: string
  className?: string
}

type PostHeadProps = PostHeadInfoProps & {
  thumbnail: IGatsbyImageData
}

const PostHeadWrapper = styled.div`
  position: relative;
  margin-top: 5.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1024px) {
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`

const BackgroundImage = styled((props: GatsbyImgProps) => (
  <GatsbyImage {...props} style={{ position: 'relative' }} />
))`
  z-index: -1;
  width: 95%;
  height: 400px;
  object-fit: cover;
  /* filter: brightness(0.25); */
  display: block;
  margin: 2rem auto 0px;

  @media (max-width: 768px) {
    height: 300px;
  }
`

const PostHead: FunctionComponent<PostHeadProps> = function ({
  title,
  date,
  categories,
  thumbnail,
}) {
  return (
    <>
      <Introduction />
      <PostHeadWrapper>
        <PostHeadInfo title={title} date={date} categories={categories} />
        <BackgroundImage image={thumbnail} alt="thumbnail" />
      </PostHeadWrapper>
    </>
  )
}

export default PostHead
