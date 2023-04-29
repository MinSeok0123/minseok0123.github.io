import 'prismjs/themes/prism-tomorrow.css'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'

import React from 'react'
import { RecoilRoot } from 'recoil'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <RecoilRoot>{element}</RecoilRoot>
    </>
  )
}
