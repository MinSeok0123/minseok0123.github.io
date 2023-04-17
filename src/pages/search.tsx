import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import { FuseResults } from '../types/fuse'

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

  // Updates the search results whenever the query or data changes
  useEffect(() => {
    const fuse = new Fuse(data.allMarkdownRemark.nodes, {
      keys: ['frontmatter.title', 'rawMarkdownBody'],
    })

    const results = fuse.search(query) as unknown as FuseResults

    setSearchResults(results)
  }, [data, query])

  // Updates the query based on the URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchQuery = urlParams.get('q')
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [])

  // Updates the URL query parameter when the query changes
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
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="검색어를 입력하세요"
      />
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map(({ item }) => (
            <li key={item.id}>
              <Link to={item.fields.slug}>
                {item.frontmatter.thumbnail && (
                  <img
                    src={
                      item.frontmatter.thumbnail.publicURL ||
                      item.frontmatter.thumbnail.childImageSharp?.fluid.src
                    }
                    alt={item.frontmatter.title}
                  />
                )}
                <div>
                  <h3>{item.frontmatter.title}</h3>
                  <p>{item.excerpt}</p>
                  <p>{item.frontmatter.date}</p>
                  <p>카테고리: {item.frontmatter.categories}</p>
                </div>
              </Link>
            </li>
          ))}
          <p>총 {searchResults.length}개의 포스트를 찾았습니다.</p>
        </ul>
      ) : (
        query && <p>검색 결과가 없습니다.</p>
      )}
    </div>
  )
}

export default Search
