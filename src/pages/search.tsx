import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Fuse from 'fuse.js'
import { Link } from 'gatsby'

interface Post {
  node: {
    id: string
    excerpt: string
    frontmatter: {
      title: string
      date: string
      thumbnail: {
        publicURL: string
      }
    }
    fields: {
      slug: string
    }
  }
}

interface SearchResult {
  title: string
  date: string
  thumbnail: string
  excerpt: string
  slug: string
}

const Search: React.FC = () => {
  const data = useStaticQuery(graphql`
    query SearchQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              thumbnail {
                publicURL
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const [searchQuery, setSearchQuery] = useState('')
  const posts = data.allMarkdownRemark.edges as Post[]

  const options = {
    keys: [
      'node.frontmatter.title',
      'node.frontmatter.date',
      'node.excerpt',
      'node.fields.slug',
    ],
    threshold: 0.3,
  }

  const fuse = new Fuse(posts, options)

  const results = fuse.search(searchQuery) as unknown as Post[]

  const searchResult: SearchResult[] = results.map(result => ({
    title: result.node?.frontmatter?.title || '',
    date: result.node?.frontmatter?.date || '',
    thumbnail: result.node?.frontmatter?.thumbnail?.publicURL || '',
    excerpt: result.node?.excerpt || '',
    slug: result.node?.fields?.slug || '',
  }))

  console.log({ searchQuery })

  return (
    <div>
      <input
        type="text"
        onChange={event => setSearchQuery(event.target.value)}
        value={searchQuery}
      />
      {searchQuery && (
        <p>
          {searchResult.length} results found for "{searchQuery}"
        </p>
      )}
      {searchResult.map(result => (
        <div key={result.slug}>
          <Link to={result.slug}>
            <img src={result.thumbnail} alt={result.title} />
            <h2>{result.title}</h2>
            <p>{result.date}</p>
            <p>{result.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Search
