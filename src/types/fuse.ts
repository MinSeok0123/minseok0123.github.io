import { ReactNode } from 'react'

export interface MarkdownNode {
  thumbnail: any
  id: string
  excerpt: string
  publicURL: string
  fields: {
    slug: string
  }
  frontmatter: {
    categories: ReactNode
    title: string
    date: string
    thumbnail: string
    category: string
  }
  rawMarkdownBody: string
}

export type FuseResult = {
  item: MarkdownNode
  matches: { indices: [number, number][] }[]
  score: number
}

export type FuseResults = FuseResult[]
