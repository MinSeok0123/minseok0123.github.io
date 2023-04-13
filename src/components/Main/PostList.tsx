import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { PostListItemType } from 'types/PostItem.types'
import useInfiniteScroll, {
  useInfiniteScrollType,
} from 'hooks/useInfiniteScroll'
import PostItem from 'components/Main/PostItem'

type PostListProps = {
  selectedCategory: string
  posts: PostListItemType[]
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  max-width: 1728px;
  grid-gap: 30px;
  margin: 0 auto;
  padding: 40px 0 100px;

  @media (max-width: 1919px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 1376px;
  }

  @media (max-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 1024px;
  }

  @media (max-width: 1056px) {
    grid-template-columns: 1fr 1fr;
    width: calc(100% - 2rem);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: calc(100% - 2rem);
  }
`

const PostList: FunctionComponent<PostListProps> = function ({
  selectedCategory,
  posts,
}) {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  )

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostList
