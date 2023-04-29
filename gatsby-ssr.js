/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'
import React from 'react'
import { RecoilRoot } from 'recoil'

export const wrapRootElement = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>
}
