import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { graphql } from 'gatsby'
import queryString, { ParsedQuery } from 'query-string'
import { PostListItemType } from 'types/PostItem.types'
import Template from 'components/Common/Template'
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList'
import Introduction from 'components/Main/Introduction'
import PostList from 'components/Main/PostList'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ToggleNav from 'components/Main/ToggleNav'
import { useRecoilState } from 'recoil'
import { selectedCategoryState, categoryListState } from '../recoil/recoil'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}) {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState,
  )
  const [categoryList, setCategoryList] = useRecoilState(categoryListState)

  // ...

  const categories = useMemo(() => {
    const categories: CategoryListProps['categoryList'] = { All: 0 }

    edges.forEach(({ node }) => {
      const { categories: postCategories } = node.frontmatter

      postCategories.forEach(category => {
        if (categories[category] === undefined) categories[category] = 1
        else categories[category]++
      })

      categories.All++
    })

    return categories
  }, [edges])

  useEffect(() => {
    setCategoryList(categories)
  }, [categories])

  useEffect(() => {
    const parsed: ParsedQuery<string> = queryString.parse(search)
    const category =
      typeof parsed.category !== 'string' || !parsed.category
        ? 'All'
        : parsed.category

    setSelectedCategory(category)
  }, [search])

  // console.log(categoryList)
  // console.log(selectedCategory)

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Introduction profileImage={gatsbyImageData} />
      {/* <CategoryList
        categoryList={categoryList}
        selectedCategory={selectedCategory}
      /> */}
      <ToggleNav />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`
