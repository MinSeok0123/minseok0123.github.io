import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import { FuseResults } from '../types/fuse'
import GlobalStyle from 'components/Common/GlobalStyle'
import styled from '@emotion/styled'
import Introduction from 'components/Main/Introduction'

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
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => {
      clearTimeout(timerId)
    }
  }, [query])

  useEffect(() => {
    const fuse = new Fuse(data.allMarkdownRemark.nodes, {
      keys: ['frontmatter.title', 'rawMarkdownBody'],
    })

    const results = fuse.search(debouncedQuery) as unknown as FuseResults

    setSearchResults(results)
  }, [data, debouncedQuery])

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
    <div>
      <Introduction />
      <title>minlog | 검색</title>
      <SearchBox>
        <div>
          <SearchBoxWrap>
            <Searchsvg width="17" height="17" viewBox="0 0 17 17">
              <path
                fill-rule="evenodd"
                d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                clip-rule="evenodd"
                fill="currentColor"
              ></path>
            </Searchsvg>
            <StyledInput
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="검색어를 입력하세요"
            />
          </SearchBoxWrap>
        </div>
        {searchResults.length > 0 && (
          <TotalPost>
            <p>
              총 <b>{searchResults.length}</b>개의 포스트를 찾았습니다.
            </p>
          </TotalPost>
        )}
        {searchResults.length > 0 ? (
          <div>
            {searchResults.map(({ item }) => (
              <ContentsDiv key={item.id}>
                <Link to={item.fields.slug}>
                  {item.frontmatter.thumbnail && (
                    <SumWrap>
                      <SearchSumnail
                        src={
                          item.frontmatter.thumbnail.publicURL ||
                          item.frontmatter.thumbnail.childImageSharp?.fluid.src
                        }
                        alt={item.frontmatter.title}
                      />
                    </SumWrap>
                  )}

                  <ContentsTit>{item.frontmatter.title}</ContentsTit>
                  <ContentsExcerpt>{item.excerpt}</ContentsExcerpt>
                  <TagWrap>
                    <p>
                      {Array.isArray(item.frontmatter.categories) &&
                        item.frontmatter.categories.map((category, index) => (
                          <CateList key={index}>
                            {index > 0}
                            {category}
                          </CateList>
                        ))}
                    </p>
                  </TagWrap>
                  <ContentsDate>
                    <p> {item.frontmatter.date}</p>
                  </ContentsDate>
                </Link>
              </ContentsDiv>
            ))}
          </div>
        ) : (
          debouncedQuery &&
          searchResults.length === 0 && (
            <NotFound>검색 결과가 없습니다.</NotFound>
          )
        )}
      </SearchBox>
      <GlobalStyle />
    </div>
  )
}

export default Search

export const SearchBox = styled.div`
  margin-top: 3.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1024px) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    width: 100%;
  }
`

export const StyledInput = styled.input`
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
  color: var(--text1);
  min-width: 0px;
  font-weight: 350;

  @media (max-width: 768px) {
    flex: 1 1 0%;
    font-size: 1.125rem;
    line-height: 1.5;
    height: auto;
  }
`

export const SearchBoxWrap = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.125s ease-in 0s;
  cursor: text;
  border: 1px solid var(--border1);
  height: 4rem;
  padding: 0px 1.5rem;

  &:focus-within {
    border-color: var(--border2);
  }

  @media (max-width: 768px) {
    height: 2.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

export const Searchsvg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1.25rem;
  @media (max-width: 768px) {
    width: 1rem;
    height: 1rem;
    margin-right: 0.75rem;
  }
`

export const TotalPost = styled.div`
  margin-bottom: 2rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: var(--text2);
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
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
  padding-top: 1rem;
  padding-bottom: 2rem;
  line-height: 1.5;
  border-bottom: 1px solid var(--border4);

  @media (max-width: 768px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`
export const ContentsTit = styled.h2`
  font-size: 1.5rem;
  margin: 0px;
  color: var(--text1);
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const ContentsExcerpt = styled.p`
  margin-bottom: 2rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--text2);
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }
`
export const TagWrap = styled.div`
  margin-bottom: -0.875rem;

  width: auto;
  height: auto;

  @media (max-width: 768px) {
    margin-bottom: -0.5rem;
  }
`

export const CateList = styled.div`
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
  color: #12b886;
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
export const ContentsDate = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 1.5rem;
  color: var(--text3);
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

export const NotFound = styled.p`
  margin-bottom: 4rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: var(--text2);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`
