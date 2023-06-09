import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'

type CategoryItemProps = {
  active: boolean
}

type GatsbyLinkProps = {
  children: ReactNode
  className?: string
  to: string
} & CategoryItemProps

export type CategoryListProps = {
  selectedCategory: string
  categoryList: {
    [key: string]: number
  }
}

const CategoryListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 192px;
  position: absolute;
  top: 45px;
  left: -100px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 0px;

  @media (max-width: 768px) {
    left: -113px;
  }
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  display: flex;
  align-items: center;
  min-width: auto;
  height: 40px;

  background-color: var(--element);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? 'var(--velog)' : '#6e6d7a')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  // @media (max-width: 768px) {
  //   font-size: 15px;
  // }

  &:hover {
    background-color: var(--catebg);
  }
`

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CategoryListWrapper>
          {Object.entries(categoryList).map(([name, count]) => (
            <CategoryItem
              to={`${
                window.sessionStorage.getItem('tense') === '최신'
                  ? '/recent'
                  : ''
              }/?category=${name}`}
              active={name === selectedCategory}
              key={name}
            >
              {name} ({count})
            </CategoryItem>
          ))}
        </CategoryListWrapper>
      </motion.div>
    </>
  )
}

export default CategoryList
