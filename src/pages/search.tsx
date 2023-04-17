import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import { FuseResults } from '../types/fuse'
import GlobalStyle from 'components/Common/GlobalStyle'
import styled from '@emotion/styled'

const Search: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD")
            thumbnail {
              publicURL
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            categories
          }
          rawMarkdownBody
        }
      }
    }
  `)

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FuseResults>([])

  useEffect(() => {
    const fuse = new Fuse(data.allMarkdownRemark.nodes, {
      keys: ['frontmatter.title', 'rawMarkdownBody'],
    })

    const results = fuse.search(query) as unknown as FuseResults

    setSearchResults(results)
  }, [data, query])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchQuery = urlParams.get('q')
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (query) {
      urlParams.set('q', query)
    } else {
      urlParams.delete('q')
    }
    navigate(`/search/?${urlParams.toString()}`, { replace: true })
  }, [query])

  return (
    <>
      <SearchWrap>
        <SearchBox>
          <SearchBoxWrap>
            <svg width="17" height="17" viewBox="0 0 17 17">
              <path
                fill-rule="evenodd"
                d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                clip-rule="evenodd"
                fill="currentColor"
              ></path>
            </svg>
            <StyledInput
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="검색어를 입력하세요"
            />
          </SearchBoxWrap>

          <TotalPost>
            총 <b>{searchResults.length}</b>개의 포스트를 찾았습니다.
          </TotalPost>
          {searchResults.length > 0 ? (
            <SearchContents>
              {searchResults.map(({ item }) => (
                <ContentsDiv key={item.id}>
                  <Link to={item.fields.slug}>
                    {item.frontmatter.thumbnail && (
                      <SumWrap>
                        <SearchSumnail
                          src={
                            item.frontmatter.thumbnail.publicURL ||
                            item.frontmatter.thumbnail.childImageSharp?.fluid
                              .src
                          }
                          alt={item.frontmatter.title}
                        />
                      </SumWrap>
                    )}
                    <div>
                      <ContentsTit>{item.frontmatter.title}</ContentsTit>
                      <ContentsExcerpt>{item.excerpt}</ContentsExcerpt>
                      <TagWrap>
                        <p>
                          {Array.isArray(item.frontmatter.categories) &&
                            item.frontmatter.categories.map(
                              (category, index) => (
                                <span key={index}>
                                  {index > 0 && ', '}
                                  {category}
                                </span>
                              ),
                            )}
                        </p>
                      </TagWrap>
                      <p>{item.frontmatter.date}</p>
                    </div>
                  </Link>
                </ContentsDiv>
              ))}
            </SearchContents>
          ) : (
            query && <p>검색 결과가 없습니다.</p>
          )}
        </SearchBox>
        <GlobalStyle />
      </SearchWrap>
    </>
  )
}

export default Search

export const StyledInput = styled.input`
  margin-left: 1.25rem;
  font-size: 1.5rem;
  line-height: 2rem;
  height: 2rem;
  transition: all 0.125s ease-in 0s;
  flex: 1 1 0%;
  display: block;
  padding: 0px;
  border: none;
  outline: 0px;
  background: transparent;
  color: colorf;
  min-width: 0px;
`

export const SearchWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const SearchBox = styled.div`
  margin-top: 3.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`

export const SearchBoxWrap = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  border: 1px solid #a0a0a0;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.125s ease-in 0s;
  cursor: text;
  height: 4rem;
  padding: 0px 1.5rem;
`

export const TotalPost = styled.a`
  margin-bottom: 4rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: var(--text2);
`
export const SearchContents = styled.div`
  padding-top: 0px;
  padding-bottom: 4rem;
  line-height: 1.5;
  width: 768px;
`

export const SumWrap = styled.div`
  padding-top: 52.356%;
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
`

export const SearchSumnail = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`
export const ContentsDiv = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  line-height: 1.5;
  border-bottom: 1px solid #f1f3f5;
`
export const ContentsTit = styled.h2`
  font-size: 1.5rem;
  margin: 0px;
  color: #212529;
  word-break: keep-all;
`

export const ContentsExcerpt = styled.p`
  margin-bottom: 2rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--text2);
  word-break: keep-all;
  overflow-wrap: break-word;
`
export const TagWrap = styled.div`
  margin-bottom: -0.875rem;
  width: 768px;
  height: 46px;
`
